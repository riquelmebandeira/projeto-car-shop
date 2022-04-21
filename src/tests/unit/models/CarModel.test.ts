import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';

const carModel = new CarModel()

const newCar = {
    'model': 'Amarok',
    'year': 2022,
    'color': 'Preto',
    'buyValue': 250.000,
    'doorsQty': 4,
    'seatsQty': 5
  }

const createdCar = {
  'id': 'dc8b1dbb6a8ab33712ccec68',
  'model': 'Amarok',
  'year': 2022,
  'color': 'Preto',
  'buyValue': 250.000,
  'doorsQty': 4,
  'seatsQty': 5
}

describe('Tesde de Model', () => {

  describe('Car', async () => {

    before(() => sinon.stub(Model, 'create').resolves(createdCar))

    after(() => (Model.create as sinon.SinonStub).restore())

    it('Cria um novo carro com sucesso', async () => {
      expect(await carModel.create(newCar)).to.be.equal(createdCar);
    });
  })
});