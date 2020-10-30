const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getAllCards = (req, res, next) => Card.find({})
  .orFail(new UnauthorizedError('Необходимо авторизоваться'))
  .then((data) => res.status(200).send(data.reverse()))
  .catch(next);

const createCard = (req, res, next) => {
  const _id = req.user.id;
  return Card.create({ name: req.body.name, link: req.body.link, owner: _id })
    .then((card) => {
      if (!card) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      res.status(201).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.remove({ _id: req.params.id })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then(() => res.status(200).send({ message: `Карточка ${req.params.id} удалена` }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { likes: req.user.id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { likes: req.user.id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
