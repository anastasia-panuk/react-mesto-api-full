const { INTERNAL_SERVER_ERR } = require('../utils/constants/constants');
const HTTPError = require('./HTTPError');

class ServerError extends HTTPError {
  constructor(message) {
    super(message, INTERNAL_SERVER_ERR);
  }
}

module.exports = ServerError;
