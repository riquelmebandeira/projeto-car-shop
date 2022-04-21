import { ZodAny } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrorInterface';

abstract class Service<T> {
  constructor(public model: Model<T>, public documentSchema: ZodAny) { }

  public async create(obj: T): Promise<T | ServiceError> {
    const parsed = this.documentSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  }
}

export default Service;