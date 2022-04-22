import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { allCars, createdCar, validCar } from '../mocks/CarsMocks';

const carModel = new CarModel()

describe('Ao chamar, no model de Car', () => {

  describe('o método create', async () => {

    before(() => sinon.stub(Model, 'create').resolves(createdCar))

    after(() => (Model.create as sinon.SinonStub).restore())

    it('Cria um novo carro com sucesso', async () => {
      expect(await carModel.create(validCar)).to.be.equal(createdCar);
    });
  })

  describe('o método read', async () => {

    before(() => sinon.stub(Model, 'find').resolves(allCars))

    after(() => (Model.find as sinon.SinonStub).restore())

    it('Retorna todos os carros', async () => {
      expect(await carModel.read()).to.be.equal(allCars);
    });
  })
});