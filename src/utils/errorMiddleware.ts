import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import CustomError from './CustomError';
import ErrorMessages from './ErrorMessages';

const errorMiddleware = ( 
  err: ErrorRequestHandler, 
  _req: Request,
  res: Response, 
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json(err);
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: ErrorMessages.INTERNAL_SERVER_ERROR });

  next();
};

export default errorMiddleware;