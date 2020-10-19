const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'secret!';

if(!process.env.JWT_SECRET) {
  throw new Error ('Нужна переменная окружения')
}

const getAllUsers = (req, res) => User.find({})
  .then((data) => {
    if (!data) {
      res
        .status(500)
        .send('На сервере произошла ошибка');
      return;
    }
    res.status(200).send(data);
  });

const getUserById = (req, res) => User.findById({ _id: req.params.id })
  .then((user) => {
    if (user === null) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  })
  .catch((error) => {
    if (error.name = 'CastError') {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.status(500).send('На сервере произошла ошибка');
  });

const createUser = (req, res) => {
  const { email, password } = req.body;


  return bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      res.status(500).send({ message: 'Не удалось создать пользователя' })
    }
    return User.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(409).send({ message: 'Такой пользователь уже существует' })
        }

        return User.create({ email, password: hash })
          .then(user => {
            return res.status(200).send({ message: `Пользователь ${user.email} успешно создан` })
          })
          .catch(err => res.status(500).send({ message: 'Не удалось создать пользователя' }))
      })
      .catch(err => res.status(500).send({ message: 'Не удалось проверить уникальность пользователя' }))
  })
}

const userAuth = (req, res) => {
  const { email, password } = req.body;


  return User.findOne({ email }).select('+password')
    .then(async user => {
      if (!user) {
        return res.status(401).send({ message: 'Такого пользователя не существует' })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).send({ message: 'Не правильный логин или пароль' })
      } 
      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

      return res.status(200).send({ token });
        
    })
    .catch(err => res.status(500).send({ message: 'Не удалось найти пользователя' }))
}

// const createUser = (req, res) => User.create(req.body)
//   .then((user) => {
//     return res.status(201).send(user);
//   })
//   .catch((error) => {
//     if (error.name === 'ValidationError') {
//       res.status(400).send({ message: 'Получены не корректные данные' });
//       return;
//     }
//     res.status(500).send('На сервере произошла ошибка');
//   });

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  userAuth
};
