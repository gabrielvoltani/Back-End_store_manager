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

const addProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.addProduct(name);

  if (!newProduct.id) { 
    return res.status(newProduct.status).json({ message: newProduct.message });
  }
  return res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};