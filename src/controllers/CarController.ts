import Controller from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  constructor(service = new CarService(), route = '/cars') {
    super(service, route);
  }
}

export default CarController;