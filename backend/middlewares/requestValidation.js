const { celebrate, Joi } = require('celebrate');

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const validationCard = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().email(),
    url: Joi.string().required().min(5),
  }),
});

module.exports = {
    validationUser
};