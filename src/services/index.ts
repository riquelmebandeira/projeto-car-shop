import { z, ZodAny } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrorInterface';

const idSchema = z.string().length(24).regex(/[a-z][0-9]+/);
abstract class Service<T> {
  constructor(public model: Model<T>, public documentSchema: ZodAny) { }

  public async create(obj: T): Promise<T | ServiceError> {
    const parsed = this.documentSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  }

  public async read(): Promise<T[]> { return this.model.read(); }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    const parsed = idSchema.safeParse(id);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.readOne(id); 
  }
}

export default Service;