const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const productMock = require('../mocks/product.mock');

const {
  productIdFindById,
  allSalesProducts,
  findSalesById,
  findSalesProductById,
} = require('../mocks/sales.mock')
const saleModel = require('../../../src/models/sale.model');
const saleService = require('../../../src/services/sale.service');

describe('Testes do Produto - Service', () => {
  afterEach(sinon.restore);

  it('Testa se o service traz todos os produtos', async () => {
    sinon.stub(productModel, 'getAllProducts')
      .resolves(productMock.allProducts);

    const products = await productService.getAllProducts();

    expect(products).to.be.deep.equal(productMock.allProducts);
  });

  it('Testa se o service traz todos as vendas', async () => {
    sinon.stub(saleModel, 'getAllSales')
      .resolves(allSalesProducts);

    const products = await saleService.getAllSales();

    expect(products).to.be.deep.equal(allSalesProducts);
  });

  it('Testa se o service traz um produto especifico', async () => {
    sinon.stub(productModel, 'getProductById')
      .resolves(productMock.oneProduct);

    const product = await productService.getProductById(1);

    expect(product.message).to.be.deep.equal(productMock.oneProduct);
  });

  it('Testa se o service traz a menssagem "Product Not Found" quando é passado um ID inexistente', async () => {
    sinon.stub(productModel, 'getProductById')
      .resolves(undefined);

    const error = await productService.getProductById(0);

    expect(error).to.be.deep.equal({ status: 404, message: 'Product not found' });
  });

  it('testa se um produto é cadastrado corretamente', async () => {
    sinon
      .stub(productModel, 'addProduct')
      .resolves({ insertId: 4 });

    const product = await productService.addProduct('Xablau');

    expect(product).to.be.deep.equal(productMock.newProduct);
  });

});