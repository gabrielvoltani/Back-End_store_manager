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

const addProduct = async (name) => {
  const newProduct = await productModel.addProduct(name);

  return { id: newProduct.insertId, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};