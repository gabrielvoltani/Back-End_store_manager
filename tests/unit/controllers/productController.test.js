const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
const productMock = require('../mocks/product.mock');


const {
  productIdFindById,
  allSalesProducts,
  findSalesById,
  findSalesProductById,
} = require('../mocks/sales.mock')
const saleController = require('../../../src/controllers/sale.controller');
const saleService = require('../../../src/services/sale.service');


describe('Testes do Produto - Controller', async () => {
  afterEach(sinon.restore);

  it('Testa se o controller traz todos os produtos', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getAllProducts').resolves(productMock.allProducts);

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock.allProducts);
  });

  it('Testa se o controller traz todas as vendas', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleService, 'getAllSales').resolves(allSalesProducts);

    await saleController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesProducts);
  });
  it('Testa se o controller traz um produto especifico', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductById').resolves({ status: 200, message: productMock.oneProduct });

    await productController.getProductById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock.oneProduct);
  });

  it('Testa se o controller traz a mensagem "Product not found" quando é passado um ID que não existe', async () => {
    const res = {};
    const req = { params: { id: 0 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductById').resolves({ status: 404, message: 'Product not found' });

    await productController.getProductById(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testa se o controller cadastrar um produto especifico', async () => {
    const res = {};
    const req = { body: { name: 'Xablau' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'addProduct').resolves(productMock.newProduct);

    await productController.addProduct(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMock.newProduct);
  });

  it('Testa se o controller retorna uma messangem de error ao tentar cadastrar um produto sem nome', async () => {
    const res = {};
    const req = { body: { name: '' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'addProduct').resolves({ status: 400, message: '"name" is not allowed to be empty' });

    await productController.addProduct(req, res)

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" is not allowed to be empty'
    });
  });

});