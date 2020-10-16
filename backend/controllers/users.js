const User = require('../models/user');

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
    if(user === null) {
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

const createUser = (req, res) => User.create(req.body)
  .then((user) => {
    return res.status(201).send(user);
  })
  .catch((error) => {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Получены не корректные данные' });
      return;
    }
    res.status(500).send('На сервере произошла ошибка');
  });

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
