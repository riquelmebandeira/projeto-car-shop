import * as sinon from 'sinon';
import { expect } from 'chai';
import CarController from '../../../controllers/CarController';
import { allCars, createdCar, invalidCar, validCar } from '../mocks/CarsMocks';
import ServiceError from '../../../interfaces/ServiceErrorInterface';
import { Response } from 'express';
import ErrorMessages from '../../../utils/ErrorMessages';

const carController = new CarController()

const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
});

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('Ao chamar, no controller de Car', () => {
  describe('O método create', async () => {
    before(() => (
      sinon.stub(carController.service, 'create')
      .onCall(0)
      .resolves({error: {}} as ServiceError)
      .onCall(1)
      .resolves(createdCar)
      ))

    after(() => (carController.service.create as sinon.SinonStub).restore())

    describe('e enviar uma requisição inválida', async () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o json com um erro', async () => {
        await carController.create(req, res);

        expect(res.json.calledWith({ error: {} })).to.be.equal(true);
      });
      
      it('É chamado o status com o código 400', () => {
        expect(res.status.calledWith(400)).to.be.equal(true)
      })
    })

    describe('e enviar uma requisição válida', () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;
  
      it('É chamdao o json com o carro criado', async () => {
        await carController.create(req, res);

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

    const req = mockRequest() as any;
    const res = mockResponse() as any;
    
    it('É chamado o json com um array de objetos', async () => {
      await carController.read(req, res);

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
      .resolves({error: {}} as ServiceError)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(createdCar)
      ))

    after(() => (carController.service.readOne as sinon.SinonStub).restore())

    describe('passando um id inválido', async () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o json com um erro', async () => {
        await carController.readOne(req, res);
        expect(res.json.calledWith({ error: ErrorMessages.INVALID_ID })).to.be.equal(true);
      });
      
      it('É chamado o status com o código 400', () => {
        expect(res.status.calledWith(400)).to.be.equal(true)
      })
    })

    describe('passando um id inexistente', async () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o json com um erro', async () => {
        await carController.readOne(req, res);
        expect(res.json.calledWith({ error: ErrorMessages.NOT_FOUND })).to.be.equal(true);
      });
      
      it('É chamado o status com o código 404', () => {
        expect(res.status.calledWith(404)).to.be.equal(true)
      })
    })

    describe('passando um id válido', () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;
  
      it('É chamado o json com o objeto do veículo', async () => {
        await carController.readOne(req, res);
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
      .resolves({ error: ErrorMessages.INVALID_ID } as unknown as ServiceError)
      .onCall(1)
      .resolves({ error: {} } as ServiceError)
      .onCall(2)
      .resolves(null)
      .onCall(3)
      .resolves(createdCar)
      ))

    after(() => (carController.service.update as sinon.SinonStub).restore())

    describe('passando um id inválido', async () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o json com um erro', async () => {
        await carController.update(req, res);
        expect(res.json.calledWith({ error: ErrorMessages.INVALID_ID })).to.be.equal(true);
      });
      
      it('É chamado o status com o código 400', () => {
        expect(res.status.calledWith(400)).to.be.equal(true)
      })
    })

    describe('passando um body inválido', async () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o json com um erro', async () => {
        await carController.update(req, res);
        expect(res.json.calledWith({ error: {} })).to.be.equal(true);
      });
      
      it('É chamado o status com o código 400', () => {
        expect(res.status.calledWith(400)).to.be.equal(true)
      })
    })

    describe('passando um id inexistente', async () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;

      it('É chamado o json com um erro', async () => {
        await carController.update(req, res);
        expect(res.json.calledWith({ error: ErrorMessages.NOT_FOUND })).to.be.equal(true);
      });
      
      it('É chamado o status com o código 404', () => {
        expect(res.status.calledWith(404)).to.be.equal(true)
      })
    })

    describe('passando dados válidos', () => {
      const req = mockRequest() as any;
      const res = mockResponse() as any;
  
      it('É chamado o json com o objeto do veículo', async () => {
        await carController.update(req, res);
        expect(res.json.calledWith(createdCar)).to.be.equal(true);
      });

      it('É chamado o status com o código 200', () => {
        expect(res.status.calledWith(200)).to.be.equal(true)
      })
    })
  })
});