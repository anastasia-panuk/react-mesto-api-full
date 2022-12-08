const { Joi, Segments, celebrate } = require('celebrate');

const { urlRegExp } = require('../utils/constants/constants');

module.exports.bodyCards = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
});
module.exports.paramsCards = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24),
  }).required(),
});
