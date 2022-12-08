const { NOT_FOUND_ERR } = require('../utils/constants/constants');
const HTTPError = require('./HTTPError');

class NotFoundError extends HTTPError {
  constructor(message) {
    super(message, NOT_FOUND_ERR);
  }
}

module.exports = NotFoundError;
