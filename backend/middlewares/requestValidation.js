const { celebrate, Joi } = require('celebrate');

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
});

const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(5).pattern(/^(http|https):\/\/[^ "]+$/)
  })
});

const validationId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().required().length(24)
  })
});

const validationUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(5).max(30)
  })
});

const validationAvatarLink = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/)
  })
});

const validationAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(3)
  })
});

const validationTokenCheck = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required()
  }).unknown(true)
});

module.exports = {
  validationUser,
  validationCard
};