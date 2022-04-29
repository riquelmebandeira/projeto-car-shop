import { z, ZodAny } from 'zod';
import ControllerErrors from '../enums/ControllerErros';
import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrorInterface';

export const idSchema = z.string().length(24);
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

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    const parsedId = idSchema.safeParse(id);
    
    if (!parsedId.success) {
      return { error: ControllerErrors.invalidId } as unknown as ServiceError;
    }

    const parsedObj = this.documentSchema.safeParse(obj);

    if (!parsedObj.success) {
      return { error: parsedObj.error };
    }

    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    const parsed = idSchema.safeParse(id);

    if (!parsed.success) {
      return { error: ControllerErrors.invalidId } as unknown as ServiceError;
    }

    return this.model.delete(id);
  }
}

export default Service;