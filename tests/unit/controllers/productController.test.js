const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
const productMock = require('../mocks/product.mock');

describe('Testes do Produto - Controller', async () => {
  afterEach(sinon.restore);

  it('testa listagem de todos os produtos', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getAllProducts').resolves(productMock.allProducts);

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock.allProducts);
  });

  it('testa listagem de um produto com id específico', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductById').resolves({ status: 200, message: productMock.singleProduct });

    await productController.getProductById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock.singleProduct);
  });
  
  it('testa se o controller traz a mensagem "Product not found" quando é passado um ID que não existe', async () => {
    const res = {};
    const req = { params: { id: 0 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getProductById').resolves({ status: 404, message: 'Product not found' });
    await productController.getProductById(req, res)
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  }); 

  it('testa se um produto é cadastrado corretamente', async () => {
    const res = {};
    const req = { body: { name: 'Mose!' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'addProduct').resolves( {id: 4, name: 'Mose!'});

    await productController.addProduct(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMock.newProduct[0]);
  });

  it('testa se retorna status 404 com nome incorreto na adição de um novo produto', async () => {
    const res = {};
    const req = { body: { name: 'Mose' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'addProduct').resolves({ status: 404 });

    await productController.addProduct(req, res)

    expect(res.status).to.have.been.calledWith(404);
  });

  it('testa se o controller atualiza um produto', async () => {
    const res = {};
    const req = { params: { id: 1 }, body: { name: 'Martelo de Roht' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'updateProduct').resolves( {status: 201, message: productMock.updatedProduct});

    await productController.updateProduct(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMock.updatedProduct);
  });

  it('testa se o controller deleta um produto', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'deleteProduct').resolves({ status: 201 });

    await productController.deleteProduct(req, res)

    expect(res.status).to.have.been.calledWith(201);
  });

  it('testa se o controller retorna status 404 ao tentar deletar um produto com id errado', async () => {
    const res = {};
    const req = { params: { id: 25 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'deleteProduct').resolves({ status: 404, message: 'Product not found' });

    await productController.deleteProduct(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

});