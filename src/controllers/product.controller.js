const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productService.getProductById(id);

  if (status !== 404) {
    return res.status(status).json(message);
  }

  return res.status(status).json({ message });
};

module.exports = {
  getAllProducts,
  getProductById,
};