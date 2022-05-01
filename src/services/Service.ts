import { z, ZodAny } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import NotFoundError from '../utils/NotFoundError';
import InvalidIdError from '../utils/InvalidIdError';

export const idSchema = z.string().length(24);

abstract class Service<T> {
  constructor(public model: Model<T>, public documentSchema: ZodAny) { }

  public async create(obj: T): Promise<T> {
    this.documentSchema.parse(obj);

    return this.model.create(obj);
  }

  public async read(): Promise<T[]> { return this.model.read(); }

  public async readOne(id: string): Promise<T> {
    const parsedId = idSchema.safeParse(id);

    if (!parsedId.success) throw new InvalidIdError();

    const obj = await this.model.readOne(id);

    if (!obj) throw new NotFoundError();

    return obj;
  }

  public async update(id: string, obj: T): Promise<T> {
    const parsedId = idSchema.safeParse(id);

    if (!parsedId.success) throw new InvalidIdError();
  
    this.documentSchema.parse(obj);

    const result = await this.model.update(id, obj);

    if (!result) throw new NotFoundError();

    return result;
  }

  public async delete(id: string): Promise<void> {
    const parsedId = idSchema.safeParse(id);

    if (!parsedId.success) throw new InvalidIdError();

    const result = await this.model.delete(id);

    if (!result) throw new NotFoundError();
  }
}

export default Service;