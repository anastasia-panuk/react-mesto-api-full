const Card = require('../models/card');
const HTTPError = require('../errors/HTTPError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED_STATUS } = require('../utils/constants/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      'owner',
      'likes',
    ])
    .then((cards) => res.send(cards))
    .catch(() => {
      next(new ServerError('Ошибка сервера.'));
    });
};

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Переданы некорректные данные при создании карточки.' }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки.');
      } else {
        card.remove()
          .then(() => res.send(card))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      } else {
        next(err);
      }
    });
};
