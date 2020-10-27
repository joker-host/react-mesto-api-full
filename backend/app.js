const express = require('express');
const cors = require('cors')
const path = require("path")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/apiRouter');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger')
const NotFoundError = require('./errors/NotFoundError.js');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.use(errorLogger); //добавить в git ignore

app.use(errors());

// app.use('*', (req, res) => {
//   throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
// });

app.use(() => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({ message: err.message || 'На сервере произошла ошибка'});
});

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'На сервере произошла ошибка'
//         : message
//     });
// });

app.listen(PORT, () => {
  console.log(`Мы слушаем на порту ${PORT}`);
});
