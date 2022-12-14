// require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const HTTPError = require('../errors/HTTPError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  CREATED_STATUS,
  UNIQUE_ERR,
} = require('../utils/constants/constants');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({}).then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

module.exports.createUsers = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((userData) => {
      const { password: removed, ...user } = userData.toObject();
      res.status(CREATED_STATUS).send(user);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.code === UNIQUE_ERR) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан невалидный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => User.findUserByCredentials(req.body)
  .then((user) => {
    const { JWT_SECRET } = req.app.get('config');
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.send({ token });
  })
  .catch((err) => {
    next(err);
  });

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};
