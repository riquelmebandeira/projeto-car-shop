import CustomError from './CustomError';
import ErrorMessages from './ErrorMessages';
import StatusCode from './StatusCode';

class NotFoundError extends CustomError {
  constructor(
    message = ErrorMessages.NOT_FOUND,
    status = StatusCode.NOT_FOUND,
  ) {
    super(message, status);
  }
}

export default NotFoundError;