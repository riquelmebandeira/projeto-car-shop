import * as sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/CarService';
import { Car } from '../../../interfaces/CarInterface';
import { allCars, createdCar, invalidCar, validCar } from '../mocks/CarsMocks';
import { idSchema } from '../../../services';
import NotFoundError from '../../../utils/NotFoundError';
import InvalidIdError from '../../../utils/InvalidIdError';

const carService = new CarService()

const safeParseError = {
  success: false,
  error: {}
}

const safeParseSucess = {
  success: true,
  data: {}
}

const mockError = {}

describe('Ao chamar, no service de Car', () => {
  describe('O método create', async () => {
    before(() => (
      sinon.stub(carService.model, 'create').resolves(createdCar),
      sinon.stub(carService.documentSchema, 'parse')
      .onCall(0)
      .throws(mockError)
      .returns(validCar)
      ))

    after(() => (
      (carService.model.create as sinon.SinonStub).restore(),
      (carService.documentSchema.parse as sinon.SinonStub).restore()
      )
    )

    describe('e passar um objeto inválido', () => {
      it('É lançado um erro', async () => {
        try {
          await carService.create(invalidCar as Car);
        } catch (error) {
          expect(error).to.be.equal(mockError)
        }
      });
    })

    describe('e passar um objeto válido', () => {
      it('Cria um novo carro com sucesso', async () => {
        expect(await carService.create(validCar)).to.be.equal(createdCar);
      });
    })
  })

  describe('O método read', async () => {
    before(() => sinon.stub(carService.model, 'read').resolves(allCars))
    after(() => (carService.model.read as sinon.SinonStub).restore())

    it('Retorna todos os carros', async () => {
      expect(await carService.read()).to.be.equal(allCars);
    });
  })

  describe('O método readOne', async () => {
    before(() => (
      sinon.stub(carService.model, 'readOne')
      .onCall(0)
      .resolves(null)
      .onCall(1)
      .resolves(createdCar),
      sinon.stub(idSchema, 'safeParse')
      .onCall(0)
      .returns(safeParseError as any)
      .returns(safeParseSucess as any)
      )
    )

    after(() => (
      (carService.model.readOne as sinon.SinonStub).restore(),
      (idSchema.safeParse as sinon.SinonStub).restore()
      )
    )

    describe('passando um id inválido', () => {
      it('É lançado o erro de id inválido', async () => {
        try {
          await carService.readOne('');
        } catch (error) {
          expect(error).to.be.instanceOf(InvalidIdError);
        }
      })
    })

    describe('passando um id inexistente', () => {
      it('É lançado o erro de não encontrado', async () => {
        try {
          await carService.readOne('');
        } catch (error) {
          expect(error).to.be.instanceOf(NotFoundError);
        }
      })
    })

    describe('passando um id existente', () => {
      it('É retornado o objeto do carro', async () => {
        expect(await carService.readOne('')).to.be.equal(createdCar);
      })
    })
  })

  describe('O método update', () => {
    before(() => (
      sinon.stub(carService.model, 'update')
      .onCall(0)
      .resolves(null)
      .onCall(1)
      .resolves(createdCar),

      sinon.stub(idSchema, 'safeParse')
      .onCall(0)
      .returns(safeParseError as any)
      .returns(safeParseSucess as any),

      sinon.stub(carService.documentSchema, 'parse')
      .onCall(0)
      .throws(mockError)
      .returns(safeParseSucess as any)
      ))

    after(() => (
      (carService.model.update as sinon.SinonStub).restore(),
      (idSchema.safeParse as sinon.SinonStub).restore(),
      (carService.documentSchema.parse as sinon.SinonStub).restore()
    ))

    describe('passando um id inválido', () => {
      it('É lançado o erro de id inválido', async () => {
        try {
          await carService.update('', {} as Car);
        } catch (error) {
          expect(error).to.be.instanceOf(InvalidIdError);
        }
      })
    })

    describe('passando um objeto inválido', () => {
      it('É lançado um erro', async () => {
        try {
          await carService.update('', {} as Car);
        } catch (error) {
          expect(error).to.be.equal(mockError);
        }
      })
    })

    describe('passando um id inexistente', () => {
      it('É lançado o erro de não encontrado', async () => {
        try {
          await carService.update('', {} as Car);
        } catch (error) {
          expect(error).to.be.instanceOf(NotFoundError);
        }
      })
    })

    describe('passando dados válidos', () => {
      it('Atualiza e retorna o documento', async () => {
        const response = await carService.update('', {} as Car)

        expect(response).to.be.equal(createdCar);
      })
    })
  })

  describe('O método delete', async () => {
    before(() => (
      sinon.stub(carService.model, 'delete')
      .onCall(0)
      .resolves(null)
      .onCall(1)
      .resolves(createdCar),
      sinon.stub(idSchema, 'safeParse')
      .onCall(0)
      .returns(safeParseError as any)
      .returns(safeParseSucess as any)
      )
    )

    after(() => (
      (carService.model.delete as sinon.SinonStub).restore(),
      (idSchema.safeParse as sinon.SinonStub).restore()
      )
    )

    describe('passando um id inválido', () => {
      it('É lançado o erro de id inválido', async () => {
        try {
          await carService.delete('');
        } catch (error) {
          expect(error).to.be.instanceOf(InvalidIdError);
        }
      })
    })

    describe('passando um id inexistente', () => {
      it('É lançado o erro de não encontrado', async () => {
        try {
          await carService.delete('');
        } catch (error) {
          expect(error).to.be.instanceOf(NotFoundError);
        }
      })
    })

    describe('passando um id existente', () => {
      it('Nada é retornado', async () => {
        const response = await carService.delete('');
        expect(response).to.be.equal(undefined);
      })
    })
  })
});