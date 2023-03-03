const saleModel = require('../models/sale.model');
const validationsSale = require('./validations/validations.service');

const newSale = async (sales) => {
  const erro = await validationsSale.validations(sales);

  if (erro) {
    return erro;
  }

  const sale = await saleModel.newSale(sales);

  return ({ id: sale, itemsSold: sales });
};

module.exports = {
  newSale,
};