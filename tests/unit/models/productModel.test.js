const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connectionDB');
const productModel = require('../../../src/models/product.model');
const productMock = require('../mocks/product.mock');

describe('Testes do Produto - Model', () => {
  afterEach(sinon.restore);

  it('testa listagens de todos os produtos', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.allProducts]);

    const products = await productModel.getAllProducts();

    expect(products).to.be.deep.equal(productMock.allProducts);
  });

  it('testa listagem de um produto com id específico', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.singleProduct]);

    const product = await productModel.getProductById(1);

    expect(product).to.be.deep.equal(productMock.singleProduct[0]);
  });

  it('testa se um produto é cadastrado no BD corretamente', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.newProduct]);

    const product = await productModel.addProduct('Mose!')
    expect(product).to.be.deep.equal(productMock.newProduct);
  });

  it('testa maxProductId', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.allProducts]);

    const product = await productModel.maxProductId()
    expect(product).to.be.deep.equal(productMock.allProducts[0].id);
  });

  it('testa se um produto é atualizado', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.updatedProduct]);

    const product = await productModel.updateProduct('Martelo de Roht', 1)
    expect(product).to.be.deep.equal(productMock.updatedProduct);
  });

  it('testa se um produto é deletado', async () => {
    sinon
      .stub(connection, "execute")
      .resolves([productMock.singleProduct]);

    const product = await productModel.deleteProduct(1)
    expect(product).to.be.deep.equal(undefined);
  });


});