import { ZodAny } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrorInterface';

abstract class Service<T> {
  constructor(protected model: Model<T>, private documentSchema: ZodAny) { }

  public async create(obj: T): Promise<T | ServiceError> {
    const parsed = this.documentSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  }

  abstract read(): Promise<T[]>;

  abstract readOne(id: string): Promise<T | null | ServiceError>;

  abstract update(id: string, obj: T): Promise<T | null | ServiceError>;

  abstract delete(id: string): Promise<T | null | ServiceError>;
}

export default Service;