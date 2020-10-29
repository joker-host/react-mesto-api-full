const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const { JWT_SECRET, NODE_ENV } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .orFail(new UnauthorizedError('Необходимо авторизоваться'))
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then((hashPass) => {
    User.create({ password: hashPass, email })
      .then((user) => res.status(200).send({ _id: user._id }))
      .catch((error) => {
        if (error.code === 11000) {
          next(new NotFoundError('Пользователь с такими данными уже существует'));
        } else {
          next(new NotFoundError(error.message));
        }
      });
  });
};

const userAuth = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        return next(new UnauthorizedError('Такого пользователя не существует'));
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return next(new UnauthorizedError('Не правильный логин или пароль'));
      }
      const token = jwt.sign({ id: user.id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      return res.status(200).send({ token });
    })
    .catch(next);
};

const changeAvatar = (req, res, next) => {
  const avatarLink = req.body.avatar;
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { avatar: avatarLink } },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const profileEdit = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { name: name, about: about } },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  userAuth,
  changeAvatar,
  profileEdit,
};
