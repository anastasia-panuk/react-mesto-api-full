const { CONFLICT_ERR } = require('../utils/constants/constants');
const HTTPError = require('./HTTPError');

class ConflictError extends HTTPError {
  constructor(message) {
    super(message, CONFLICT_ERR);
  }
}

module.exports = ConflictError;
