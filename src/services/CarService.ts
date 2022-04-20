import { ZodAny } from 'zod';
import Service from '.';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(
    model = new CarModel(),
    documentSchema = CarSchema as unknown as ZodAny,
  ) {
    super(model, documentSchema);
  }
}

export default CarService;