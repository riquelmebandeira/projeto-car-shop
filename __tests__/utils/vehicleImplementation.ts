import { Vehicle } from '../../src/interfaces/VehicleInterface';

export const testVehicleInterface = (obj: Vehicle): boolean =>
  typeof obj.model === 'string';

export default { testVehicleInterface };
