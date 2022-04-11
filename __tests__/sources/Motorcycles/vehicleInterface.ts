import { Motorcycle } from '../../../src/interfaces/MotorcycleInterface';
import { Vehicle } from '../../../src/interfaces/VehicleInterface';

const testVehicleInterface = (obj: Vehicle): boolean => true;

const testMotorcycle: Motorcycle = {
  model: 'Yamaha NEO',
  year: 2022,
  color: 'Blue',
  buyValue: 9000,
  category: 'Street',
  engineCapacity: 125,
};

testVehicleInterface(testMotorcycle);
