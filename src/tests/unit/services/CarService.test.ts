import * as sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/CarService';
import { Car } from '../../../interfaces/CarInterface';
import { allCars, createdCar, invalidCar, validCar } from '../mocks/CarsMocks';
import { Model } from 'mongoose';

const carService = new CarService()

const safeParseError = {
  success: false,
  error: {}
}

const safeParseValid = {
  success: true,
  data: {}
}

describe('Ao chamar, no service de Car', () => {

  describe('o método create', async () => {

    before(() => (
      sinon.stub(carService.model, 'create').resolves(createdCar),
      sinon.stub(carService.documentSchema, 'safeParse')
      .onCall(0)
      .returns(safeParseError as any)
      .onCall(1)
      .returns(safeParseValid as any)
      ))

    after(() => (carService.model.create as sinon.SinonStub).restore())

    describe('e passar um objeto inválido', () => {
      it('Retorna um erro', async () => {
        expect(await carService.create(invalidCar as Car)).to.deep.equal({ error: {} })
      });
    })

    describe('e passar um objeto válido', () => {
      it('Cria um novo carro com sucesso', async () => {
        expect(await carService.create(validCar)).to.be.equal(createdCar);
      });
    })
  })

  describe('o método read', async () => {
    before(() => sinon.stub(carService.model, 'read').resolves(allCars))
    after(() => (carService.model.read as sinon.SinonStub).restore())

    it('Retorna todos os carros', async () => {
      expect(await carService.read()).to.be.equal(allCars);
    });
  })
});