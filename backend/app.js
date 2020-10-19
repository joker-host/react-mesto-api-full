const express = require('express');
const path = require("path")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/apiRouter');
const { errors } = require('celebrate');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersRouter = require('./routes/users').router;
const cardsRouter = require('./routes/cards').router;

const missingRouter = {
  message: 'Запрашиваемый ресурс не найден',
};
const missingRouterJson = JSON.stringify(missingRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use(errors());

app.use('*', (req, res) => {
  res
    .status(404)
    .send(missingRouterJson);
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Мы слушаем на порту ${PORT}`);
});
