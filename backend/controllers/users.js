const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

if (!process.env.JWT_SECRET) {
  throw new Error('Нужна переменная окружения')
}

const getAllUsers = (req, res, next) => {
  User
  .find({})
  .orFail(new UnauthorizedError('Необходимо авторизоваться'))
  .then((data) => res.status(200).send(data))
  .catch(next)
}

const getUserById = (req, res, next) => {
  User
  .findById(req.user.id)
  .orFail(new NotFoundError('Пользователь не найден'))
  .then((user) => res.status(200).send(user))
  .catch(next);
}

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (error, hash) => {
    User.findOne({ email })
      .then(user => {
        if (user) return next(new ConflictError('Такой пользователь уже существует'));
        return User
        .create({ email, password: hash })
        .then(user => {
          return res.status(200).send({ success: true, message: `Пользователь ${user.email} успешно создан` })
        })
        .catch(err => console.log(err));
      })
      .catch(next);
  })
}

const userAuth = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then(async user => {
      if (!user) {
        return next(new UnauthorizedError('Такого пользователя не существует'));
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return next(new UnauthorizedError('Не правильный логин или пароль'));
      }
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.status(200).send({ token });
    })
    .catch(next)
}

const changeAvatar = (req, res, next) => {
  const avatarLink = req.body.avatar;
  console.log(avatarLink)
  User
  .findOneAndUpdate(
    { _id: req.user.id},
    { $set: {avatar: avatarLink} },
    { new: true, runValidators: true, upsert: true }
  )
  .then(user => res.status(200).send(user))
  .catch(next);
}

const profileEdit = (req, res, next) => {
  const { name, about } = req.body;
  User
  .findOneAndUpdate(
    { _id: req.user.id },
    { $set: {name: name, about: about} },
    { new: true, runValidators: true, upsert: true }
  )
  .then(user => res.status(200).send(user))
  .catch(next)
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  userAuth,
  changeAvatar,
  profileEdit
};
