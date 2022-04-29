import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import CustomError from './CustomError';
import ErrorMessages from './ErrorMessages';
import StatusCode from './StatusCode';

const errorMiddleware = ( 
  err: ErrorRequestHandler, 
  _req: Request,
  res: Response, 
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(StatusCode.BAD_REQUEST).json(err);
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
    { error: ErrorMessages.INTERNAL_SERVER_ERROR },
  );

  next();
};

export default errorMiddleware;