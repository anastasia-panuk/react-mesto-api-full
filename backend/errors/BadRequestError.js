const { BAD_REQUEST_ERR } = require('../utils/constants/constants');
const HTTPError = require('./HTTPError');

class BadRequestError extends HTTPError {
  constructor(message) {
    super(message, BAD_REQUEST_ERR);
  }
}

module.exports = BadRequestError;
