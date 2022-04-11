import { Model } from '../../../src/interfaces/ModelInterface';

class TestModelCreateless implements Model<number> {
  read = async (): Promise<number[]> =>
    new Promise<number[]>((resolve) => resolve([1, 2, 3]));

  readOne = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));

  update = async (_id_: string, obj: number): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(obj));

  delete = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));
}

class TestModelReadless implements Model<number> {
  create = async (obj: number): Promise<number> =>
    new Promise<number>((resolve) => resolve(obj));

  readOne = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));

  update = async (_id_: string, obj: number): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(obj));

  delete = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));
}

class TestModelReadOneless implements Model<number> {
  create = async (obj: number): Promise<number> =>
    new Promise<number>((resolve) => resolve(obj));

  read = async (): Promise<number[]> =>
    new Promise<number[]>((resolve) => resolve([1, 2, 3]));

  update = async (_id_: string, obj: number): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(obj));

  delete = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));
}

class TestModelUpdateless implements Model<number> {
  create = async (obj: number): Promise<number> =>
    new Promise<number>((resolve) => resolve(obj));

  read = async (): Promise<number[]> =>
    new Promise<number[]>((resolve) => resolve([1, 2, 3]));

  readOne = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));

  delete = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));
}

class TestModelDeleteless implements Model<number> {
  create = async (obj: number): Promise<number> =>
    new Promise<number>((resolve) => resolve(obj));

  read = async (): Promise<number[]> =>
    new Promise<number[]>((resolve) => resolve([1, 2, 3]));

  readOne = async (_id_: string): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(1));

  update = async (_id_: string, obj: number): Promise<number | null> =>
    new Promise<number>((resolve) => resolve(obj));
}
