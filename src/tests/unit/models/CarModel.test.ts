import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { createdCar, validCar } from '../mocks/CarsMocks';

const carModel = new CarModel()

describe('Ao chamar, no model de Car', () => {

  describe('o método create', async () => {

    before(() => sinon.stub(Model, 'create').resolves(createdCar))

    after(() => (Model.create as sinon.SinonStub).restore())

    it('Cria um novo carro com sucesso', async () => {
      expect(await carModel.create(validCar)).to.be.equal(createdCar);
    });
  })
});