const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { urlRegExp } = require('../utils/constants/constants');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => (urlRegExp).test(v),
      message: () => 'Указана некорректная ссылка на изображение',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Указан некорректный адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((userData) => {
          if (!userData) {
            throw new AuthorizationError('Почта или пароль неверны');
          }
          return bcrypt.compare(password, userData.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                throw new AuthorizationError('Почта или пароль неверны');
              }

              const {
                password: removed,
                ...user
              } = userData.toObject();

              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
