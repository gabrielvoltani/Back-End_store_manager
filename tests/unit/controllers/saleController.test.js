const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleController = require('../../../src/controllers/sale.controller');
const saleService = require('../../../src/services/sale.service');
const saleMock = require('../mocks/sales.mock');

describe('Testes de sales - Controller', async () => {
  afterEach(sinon.restore);

  it('testa listagem de todas as sales', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'getAllSales').resolves(saleMock.allSales);

    await saleController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMock.allSales);
  });

  it('testa listagem de uma sale com id específico', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'getSaleById').resolves(saleMock.singleSale);

    await saleController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMock.singleSale);
  });

  it('testa se aparece a mensagem "Sale not found" quando é buscado uma sale com id inexistente', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'getSaleById').resolves({ status: 404, message: 'Sale not found' });

    await saleController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('testa se uma nova sale é cadastrada corretamente', async () => {
    const res = {};
    const req = { body: {productId: 1, quantity: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'newSale').resolves({ id: 5, itemsSold: 10 });

    await saleController.newSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 5, itemsSold: 10 });
  });

  it('testa se da erro ao tentar cadastrar uma venda que não passa na validação', async () => {
    const res = {};
    const req = { body: { productId: 1, quantity: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'newSale').resolves({ status: 400, id: 5, itemsSold: 10 });

    await saleController.newSale(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ status: 400, id: 5, itemsSold: 10 });
  });

  it('testa se uma sale é deletada', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'deleteSale').resolves({ status: 200 });

    await saleController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

});