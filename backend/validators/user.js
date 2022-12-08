const { Joi, Segments, celebrate } = require('celebrate');

const { urlRegExp } = require('../utils/constants/constants');

module.exports.bodyUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.paramsUser = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24),
  }).required(),
});
module.exports.bodyAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.bodyMe = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.bodyAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp),
  }),
});
