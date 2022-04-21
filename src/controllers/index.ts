import { Request, Response } from 'express';
import ControllerErrors from '../enums/ControllerErros';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

abstract class Controller<T> {
  private _route: string;

  protected errors = ControllerErrors;

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
  
      if (!obj) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in obj) return res.status(400).json(obj);
      
      return res.status(201).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default Controller;