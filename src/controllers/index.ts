import { NextFunction, Request, Response } from 'express';
import Service from '../services';
import StatusCode from '../utils/StatusCode';

export type ResponseError = {
  error: unknown;
};

abstract class Controller<T> {
  private _route: string;

  constructor(public service: Service<T>, route: string) {
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: Request,
    res: Response<T | ResponseError>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const obj = await this.service.create(req.body);
  
      return res.status(StatusCode.CREATED).json(obj);
    } catch (err) {
      next(err);
    }
  };

  read = async (
    _req: Request, 
    res: Response<T[] | ResponseError>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const result = await this.service.read();

      return res.status(StatusCode.OK).json(result);
    } catch (err) {
      next(err);
    }      
  };

  readOne = async (
    req: Request, 
    res: Response<T | ResponseError>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const obj = await this.service.readOne(req.params.id);
  
      return res.status(StatusCode.OK).json(obj);
    } catch (err) {
      next(err);
    }      
  };

  update = async (
    req: Request, 
    res: Response<T | ResponseError>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const { body, params: { id } } = req;

      const obj = await this.service.update(id, body);
  
      return res.status(StatusCode.OK).json(obj);
    } catch (err) {
      next(err);
    }    
  };

  delete = async (
    req: Request, 
    res: Response<T | ResponseError>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      await this.service.delete(req.params.id);

      return res.status(StatusCode.NO_CONTENT).json();
    } catch (err) {
      next(err);
    }
  };
}

export default Controller;