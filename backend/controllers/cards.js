const Card = require('../models/card');

const getAllCards = (req, res) => Card.find({})
  .then((data) => {
    if (!data) {
      res.status(500).send('На сервере произошла ошибка');
      return;
    }
    res.status(200).send(data);
  });

const createCard = (req, res) => {
  const { _id } = req.user;

  return Card.create({ name: req.body.name, link: req.body.link, owner: _id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name = 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send('На сервере произошла ошибка');
    });
};

const deleteCard = (req, res) => Card.remove({ _id: req.params.id })
  .then(() => {
    return res.status(200).send({ message: 'success' });
  })
  .catch((err) => {
    if (err.name = 'CastError') {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(500).send('На сервере произошла ошибка');
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
