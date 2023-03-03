const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();

  return allProducts;
};

const getProductById = async (id) => {
  const productByID = await productModel.getProductById(id);

  if (!productByID) {
    return { status: 404, message: 'Product not found' };
  }
  return { status: 200, message: productByID };
};

module.exports = {
  getAllProducts,
  getProductById,
};