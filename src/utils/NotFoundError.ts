import CustomError from './CustomError';
import ErrorMessages from '../enums/ErrorMessages';
import StatusCode from '../enums/StatusCode';

class NotFoundError extends CustomError {
  constructor(
    message = ErrorMessages.NOT_FOUND,
    status = StatusCode.NOT_FOUND,
  ) {
    super(message, status);
  }
}

export default NotFoundError;