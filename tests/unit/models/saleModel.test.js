const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connectionDB');
const saleModel = require('../../../src/models/sale.model');
const saleMock = require('../mocks/sales.mock');

describe('Testes de Sales - Model', () => {
  afterEach(sinon.restore);

  it('testa listagens de todas as vendas', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([saleMock.allSales]);

    const allSales = await saleModel.getAllSales();

    expect(allSales).to.be.deep.equal(saleMock.allSales);
  });

  it('testa listagem de uma venda com id específico', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([saleMock.singleSale]);

    const sale = await saleModel.getSaleById(1);

    expect(sale).to.be.deep.equal(saleMock.singleSale);
  });

  // it('testa se uma venda é cadastrado no BD corretamente', async () => {
  //   sinon
  //     .stub(connection, "execute")
  //     .resolves([saleMock.newSale]);

  //   const newSale = await saleModel.newSale('Mose!')
  //   expect(newSale).to.be.deep.equal(saleMock.newSale);
  // });

  it('testa se uma venda é deletada', async () => {
    sinon
      .stub(connection, "execute")
      .resolves();

    const sale = await saleModel.deleteSale(1)
    expect(sale).to.be.deep.equal(undefined);
  });


});