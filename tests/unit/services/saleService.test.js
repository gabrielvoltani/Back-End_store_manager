const { expect } = require('chai');
const sinon = require('sinon');


const saleService = require('../../../src/services/sale.service');
const saleModel = require('../../../src/models/sale.model');
const saleMock = require('../mocks/sales.mock');

const validationsSale = require('../../../src/services/validations/validations.service');

describe('Testes de Sales - Service', () => {
  afterEach(sinon.restore);

  it('testa listagens de todas as vendas', async () => {
    sinon.stub(saleModel, 'getAllSales')
      .resolves(saleMock.allSales);

    const allSales = await saleService.getAllSales();

    expect(allSales).to.be.deep.equal(saleMock.allSales);
  });

  it('testa listagens de uma venda com id específico', async () => {
    sinon.stub(saleModel, 'getSaleById')
      .resolves(saleMock.singleSale);

    const sale = await saleService.getSaleById(1);

    expect(sale).to.be.deep.equal(saleMock.singleSale);
  });

  it('testa se aparece a mensagem "Sale not found" quando é passado um id não cadastrado', async () => {
    sinon.stub(saleModel, 'getSaleById')
      .resolves([]);

    const sale = await saleService.getSaleById(29);

    expect(sale.status).to.be.deep.equal(404);
    expect(sale.message).to.be.deep.equal('Sale not found');
  });

  it('testa se uma venda é cadastrada com sucesso no DB', async () => {
    
    sinon.stub(saleModel, 'newSale')
      .resolves(4);

    const sale = await saleService.newSale(10);

    expect(sale).to.be.deep.equal(saleMock.newSale[0]);
  });

  it('testa se uma venda é deletada', async () => {
    sinon.stub(saleModel, 'deleteSale')
      .resolves();
    
    sinon.stub(saleModel, 'getSaleById')
      .resolves([saleMock.singleSale]);

    const sale = await saleService.deleteSale(1);

    expect(sale.status).to.be.deep.equal(204);
  });

  it('testa se retorna status 404 quando se tenta deletar uma venda inexistente', async () => {
    sinon.stub(saleModel, 'deleteSale')
      .resolves();

    sinon.stub(saleModel, 'getSaleById')
      .resolves([]);

    const sale = await saleService.deleteSale(18);

    expect(sale.status).to.be.deep.equal(404);
  });


});