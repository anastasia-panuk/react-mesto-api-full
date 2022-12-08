require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization) {
    throw new AuthorizationError('Необходима авторизация.');
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    let payload;
    try {
      payload = jwt.verify(
        token,
        NODE_ENV ? JWT_SECRET : 'dev-secret',
      );
    } catch (err) {
      next(new AuthorizationError('Необходима авторизация.'));
    }

    req.user = payload;

    next();
  }
};
