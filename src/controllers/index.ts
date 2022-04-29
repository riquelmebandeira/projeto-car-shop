import { Request, Response } from 'express';
import ErrorMessages from '../utils/ErrorMessages';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

abstract class Controller<T> {
  private _route: string;

  protected errors = ErrorMessages;

  constructor(public service: Service<T>, route: string) {
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const obj = await this.service.create(req.body);
  
      if (!obj) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in obj) return res.status(400).json(obj);
      
      return res.status(201).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.INTERNAL_SERVER_ERROR });
    }
  };

  read = async (
    _req: Request, 
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const result = await this.service.read();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: this.errors.INTERNAL_SERVER_ERROR });
    }      
  };

  readOne = async (
    req: Request, 
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const obj = await this.service.readOne(req.params.id);
  
      if (!obj) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in obj) {
        return res.status(400).json(
          { error: this.errors.INVALID_ID },
        );
      }
      
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.INTERNAL_SERVER_ERROR });
    }
  };

  update = async (
    req: Request, 
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body, params: { id } } = req;

      const obj = await this.service.update(id, body);
  
      if (!obj) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in obj) {
        return res.status(400).json(obj);
      }
      
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.INTERNAL_SERVER_ERROR });
    }
  };

  delete = async (
    req: Request, 
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const obj = await this.service.delete(req.params.id);

      if (!obj) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in obj) {
        return res.status(400).json(obj);
      }
      
      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({ error: this.errors.INTERNAL_SERVER_ERROR });
    }
  };
}

export default Controller;