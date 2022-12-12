const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const { path } = require('path');
// const cors = require('cors');
const {
  INTERNAL_SERVER_ERR,
} = require('./utils/constants/constants');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const {
  login,
  createUsers,
} = require('./controllers/users');
const { bodyUser, bodyAuth } = require('./validators/user');

const { PORT = 3001, DB_CONN = 'mongodb://localhost:27017/mestodb', NODE_ENV } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const config = dotenv.config({
  path: NODE_ENV === 'production' ? '.env' : '.env.common',
}).parsed;

// app.use(cors({
//   origin: '*',
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

const allowedCors = [
  'https://api.panuk.students.nomoredomains.club',
  'https://panuk.students.nomoredomains.club',
  'https://localhost:3001',
  'https://localHost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
});

app.set('config', config);

app.use(express.json());

mongoose.connect(DB_CONN);

app.use(requestLogger);

app.post('/signin', bodyAuth, login);
app.post('/signup', bodyUser, createUsers);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const status = err.statusCode || INTERNAL_SERVER_ERR;
  const message = status === INTERNAL_SERVER_ERR ? 'Ошибка сервера' : err.message;
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
