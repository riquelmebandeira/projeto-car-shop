import { ZodError } from 'zod';

export default interface ServiceError {
  error: ZodError;
}