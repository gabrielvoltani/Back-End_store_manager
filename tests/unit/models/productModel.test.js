const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connectionDB');
const productModel = require('../../../src/models/product.model');
const productMock = require('../mocks/product.mock');

const {
  productIdFindById,
    allSalesProducts,
    findSalesById,
    findSalesProductById,
} = require('../mocks/sales.mock')
const saleModel = require('../../../src/models/sale.model');

describe('Testes do Produto - Model', () => {
  afterEach(sinon.restore);

  it('testa se todos os produtos do banco são recuperados corretamente', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.allProducts]);

    const products = await productModel.getAllProducts();

    expect(products).to.be.deep.equal(productMock.allProducts);
  });

  it('testa se todos as vendas do banco são recuperadas corretamente', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([allSalesProducts]);

    const products = await saleModel.getAllSales();

    expect(products).to.be.deep.equal(allSalesProducts);
  });

  it('testa se um produto especifico é recuperado corretamente', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.oneProduct]);

    const product = await productModel.getProductById(1);

    expect(product).to.be.deep.equal(productMock.oneProduct[0]);
  });

  it('testa se uma venda especifico é recuperado corretamente', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([findSalesById]);

    const product = await saleModel.getSaleById(1);

    expect(product).to.be.deep.equal(findSalesById);
  });

  it('testa se um produto é cadastrado no BD corretamente', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.newProduct]);

    const product = await productModel.addProduct('Xablau')
    expect(product).to.be.deep.equal(productMock.newProduct);
  });

});