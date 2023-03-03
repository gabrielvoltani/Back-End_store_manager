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

const getAllSales = async () => {
  const allSales = await saleModel.getAllSales();

  return allSales;
};

const getSaleById = async (id) => {
  const saleById = await saleModel.getSaleById(id);

  if (saleById.length === 0) return { status: 404, message: 'Sale not found' };

  return saleById;
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
};