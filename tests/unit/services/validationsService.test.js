const validations = require('../../../src/services/validations/validations.service')
const productModel = require('../../../src/models/product.model');
const saleMock = require('../mocks/sales.mock');

const { expect } = require('chai');
const sinon = require('sinon');

describe('Testes de Validations - Service', () => {
  afterEach(sinon.restore);

  it('testa idMax', async () => {
    sinon
      .stub(productModel, "maxProductId")
      .resolves(1);

    const validationss = await validations.idMax(saleMock.allSales);

    expect(validationss.status).to.be.deep.equal(404);
  });

  it('testa saleMinimum com "any.requires"', async () => {

    const saleMin = await validations.saleMinimum({ details: [ {type: 'any.required'}]} );

    expect(saleMin.status).to.be.deep.equal(400);
  });

  it('testa saleMinimum com "number.min"', async () => {

    const saleMin = await validations.saleMinimum({ details: [{ type: 'number.min' }] });

    expect(saleMin.status).to.be.deep.equal(422);
  });




});