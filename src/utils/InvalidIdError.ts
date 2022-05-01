import CustomError from './CustomError';
import ErrorMessages from '../enums/ErrorMessages';
import StatusCode from '../enums/StatusCode';

class InvalidIdError extends CustomError {
  constructor(
    message = ErrorMessages.INVALID_ID,
    status = StatusCode.BAD_REQUEST,
  ) {
    super(message, status);
  }
}

export default InvalidIdError;