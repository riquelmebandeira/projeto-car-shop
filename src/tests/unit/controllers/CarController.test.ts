import * as sinon from 'sinon';
import { expect } from 'chai';
import CarController from '../../../controllers/CarController';
import { allCars, createdCar } from '../mocks/CarsMocks';
import { Response } from 'express';

const carController = new CarController()

const mockRequest = () => ({
  body: {},
  params: {},
});

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

const mockError = {}

describe('Ao chamar, no controller de Car', () => {
  describe('O método create', async () => {
    before(() => (
      sinon.stub(carController.service, 'create')
      .onCall(0)
      .throws(mockError)
      .onCall(1)
      .resolves(createdCar)
      ))

    after(() => (carController.service.create as sinon.SinonStub).restore())

    describe('e enviar uma requisição inválida', async () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o next com um erro', async () => {
        await carController.create(req, res, next);

        expect(next.calledWith(mockError)).to.be.equal(true);
      });
    })

    describe('e enviar uma requisição válida', () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;
  
      it('É chamado o json com o carro criado', async () => {
        await carController.create(req, res, next);

        expect(res.json.calledWith(createdCar)).to.be.equal(true);
      });

      it('É chamado o status com o código 201', () => {
        expect(res.status.calledWith(201)).to.be.equal(true)
      })
    })
  })

  describe('O método read', async () => {
    before(() => (sinon.stub(carController.service, 'read').resolves(allCars)));
    after(() => (carController.service.read as sinon.SinonStub).restore());

    const next = sinon.stub();
    const req = mockRequest() as any;
    const res = mockResponse() as any;
    
    it('É chamado o json com um array de objetos', async () => {
      await carController.read(req, res, next);

      expect(res.json.calledWith(allCars)).to.be.equal(true);
    });
    
    it('É chamado o status com o código 200', () => {
      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })

  describe('O método readOne', async () => {
    before(() => (
      sinon.stub(carController.service, 'readOne')
      .onCall(0)
      .throws(mockError)
      .onCall(1)
      .resolves(createdCar)
      ))

    after(() => (carController.service.readOne as sinon.SinonStub).restore())

    describe('passando um id inválido', async () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o next com um erro', async () => {
        await carController.readOne(req, res, next);
        expect(next.calledWith(mockError)).to.be.equal(true);
      });
    })

    describe('passando um id válido', () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;
  
      it('É chamado o json com o objeto do veículo', async () => {
        await carController.readOne(req, res, next);
        expect(res.json.calledWith(createdCar)).to.be.equal(true);
      });

      it('É chamado o status com o código 200', () => {
        expect(res.status.calledWith(200)).to.be.equal(true)
      })
    })
  })

  describe('O método update', async () => {
    before(() => (
      sinon.stub(carController.service, 'update')
      .onCall(0)
      .throws(mockError)
      .onCall(1)
      .resolves(createdCar)
      ))

    after(() => (carController.service.update as sinon.SinonStub).restore())

    describe('e enviar uma requisição inválida', async () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o next com um erro', async () => {
        await carController.update(req, res, next);
        expect(next.calledWith(mockError)).to.be.equal(true);
      });
    })

    describe('passando dados válidos', () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;
  
      it('É chamado o json com o objeto do veículo', async () => {
        await carController.update(req, res, next);
        expect(res.json.calledWith(createdCar)).to.be.equal(true);
      });

      it('É chamado o status com o código 200', () => {
        expect(res.status.calledWith(200)).to.be.equal(true)
      })
    })
  })

  describe('O método delete', async () => {
    before(() => (
      sinon.stub(carController.service, 'delete')
      .onCall(0)
      .throws(mockError)
      .resolves(undefined)
      ))

    after(() => (carController.service.delete as sinon.SinonStub).restore())

    describe('passando um id inválido', async () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o next com um erro', async () => {
        await carController.delete(req, res, next);
        expect(next.calledWith(mockError)).to.be.equal(true);
      });
    })

    describe('passando um id válido', () => {
      const next = sinon.stub();
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o status com o código 204', async () => {
        await carController.delete(req, res, next);
        expect(res.status.calledWith(204)).to.be.equal(true)
      })
    })
  })
});