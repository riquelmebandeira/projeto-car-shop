import CustomError from './CustomError';
import ErrorMessages from './ErrorMessages';
import StatusCode from './StatusCode';

class InvalidIdError extends CustomError {
  constructor(
    message = ErrorMessages.INVALID_ID,
    status = StatusCode.BAD_REQUEST,
  ) {
    super(message, status);
  }
}

export default InvalidIdError;