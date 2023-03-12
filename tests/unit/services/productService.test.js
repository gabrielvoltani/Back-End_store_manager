const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const productMock = require('../mocks/product.mock');

describe('Testes do Produto - Service', () => {
  afterEach(sinon.restore);

  it('testa listagens de todos os produtos', async () => {
    sinon.stub(productModel, 'getAllProducts')
      .resolves(productMock.allProducts);

    const products = await productService.getAllProducts();

    expect(products).to.be.deep.equal(productMock.allProducts);
  });

  it('testa listagem de um produto com id específico', async () => {
    sinon.stub(productModel, 'getProductById')
      .resolves(productMock.singleProduct);

    const product = await productService.getProductById(1);

    expect(product.message).to.be.deep.equal(productMock.singleProduct);
  });

  it('testa se retorna "Product not found" com id errado', async () => {
    sinon.stub(productModel, 'getProductById')
      .resolves(undefined);

    const product = await productService.getProductById(0);

    expect(product.message).to.be.deep.equal('Product not found');
  });
  
  it('testa se um produto é cadastrado corretamente', async () => {
    sinon
      .stub(productModel, 'addProduct')
      .resolves({ insertId: 4 });

    const product = await productService.addProduct('Mose!');

    expect(product).to.be.deep.equal(productMock.newProduct[0]);
  });

  it('testa se retorna "name" length must be at least 5 characters long para nome menor que o desejado ao adicionar novo produto', async () => {
    sinon
      .stub(productModel, 'addProduct')
      .resolves({ insertId: 4 });

    const product = await productService.addProduct('Mose');

    expect(product.status).to.be.equal(422);
    expect(product.message).to.be.deep.equal('"name" length must be at least 5 characters long');
  });

  it('testa se retorna "name" is not allowed to be empty se passado um nome vazio ao adicionar novo produto', async () => {
    sinon
      .stub(productModel, 'addProduct')
      .resolves({ insertId: 4 });

    const product = await productService.addProduct('');

    expect(product.status).to.be.equal(400);
    expect(product.message).to.be.deep.equal('"name" is not allowed to be empty');
  });

  it('testa se um produto é atualizado', async () => {
    sinon
      .stub(productModel, 'updateProduct')
      .resolves(productMock.updatedProduct);
    
    sinon
      .stub(productModel, 'getProductById')
      .resolves(productMock.updatedProduct);

    const product = await productService.updateProduct('Martelo de Roht', 1);

    expect(product.message).to.be.deep.equal(productMock.updatedProduct[0]);
  });

  it('testa se retorna "name" length must be at least 5 characters long para nome menor que o desejado ao atualizar um produto', async () => {
    sinon
      .stub(productModel, 'updateProduct')
      .resolves(productMock.updateProduct);

    const product = await productService.updateProduct('Mose');

    expect(product.status).to.be.equal(422);
    expect(product.message.message).to.be.deep.equal('"name" length must be at least 5 characters long');
  });

  it('testa se retorna "name" is not allowed to be empty se passado um nome vazio ao atualizar um produto', async () => {
    sinon
      .stub(productModel, 'updateProduct')
      .resolves(productMock.updateProduct);

    const product = await productService.updateProduct('');

    expect(product.status).to.be.equal(400);
    expect(product.message.message).to.be.deep.equal('"name" is not allowed to be empty');
  });

  it('testa se retorna "Product not found" com id errado ao atualizar um produto', async () => {
    sinon
      .stub(productModel, 'updateProduct')
      .resolves(productMock.updateProduct);

    sinon.stub(productModel, 'getProductById')
      .resolves(undefined);

    const product = await productService.updateProduct('Mose!', 5);

    expect(product.message.message).to.be.deep.equal('Product not found');
  });

  it('testa se um produto é deletado', async () => {
    sinon
      .stub(productModel, 'deleteProduct')
      .resolves([productMock.singleProduct]);
    
    sinon
      .stub(productModel, 'getProductById')
      .resolves(productMock.singleProduct);

    const product = await productService.deleteProduct(1)
    expect(product.status).to.be.equal(204);
  });

  it('testa se retorna status 404 ao tentar deletar um produto', async () => {
    sinon
      .stub(productModel, 'deleteProduct')
      .resolves([productMock.singleProduct]);
    sinon
      .stub(productModel, 'getProductById')
      .resolves(undefined);

    const product = await productService.deleteProduct(10)
    expect(product.status).to.be.equal(404);
  });

});