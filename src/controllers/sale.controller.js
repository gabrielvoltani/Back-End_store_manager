const saleService = require('../services/sale.service');

const newSale = async (req, res) => {
  const sales = req.body;

  const sale = await saleService.newSale(sales);

  if (sale.status) {
    return res.status(sale.status).json(sale);
  }

  return res.status(201).json({
    id: sale.id, itemsSold: sale.itemsSold,
  });
};

module.exports = {
  newSale,
};