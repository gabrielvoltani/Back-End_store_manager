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

const getAllSales = async (_req, res) => {
  const allSales = await saleService.getAllSales();

  res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const saleById = await saleService.getSaleById(id);

  if (!saleById.status) {
    return res.status(200).json(saleById);
  }

  return res.status(saleById.status).json({ message: saleById.message });
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
};