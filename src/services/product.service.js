const productModel = require('../models/product.model');
const validations = require('./validations/validations.service');

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
  const { error } = validations.nameValidation.validate({ name });

  if (error) {
    if (error.details[0].type === 'string.min') {
      return { status: 422, message: error.message };
    }
    return { status: 400, message: error.message };
  }
  
  const newProduct = await productModel.addProduct(name);

  return { id: newProduct.insertId, name };
};

const updateProduct = async (name, id) => {
  const { error } = validations.nameValidation.validate({ name });

  if (error) {
    if (error.details[0].type === 'string.min') {
      // return { status: 422, message: error.message };
      return { status: 422, message: { message: error.message } };
    }
    // return { status: 400, message: error.message };
    return { status: 400, message: { message: error.message } };
  }
  
  const productByID = await productModel.getProductById(id);

  if (!productByID) {
    // return { status: 404, message: 'Product not found' };
    return { status: 404, message: { message: 'Product not found' } };
  }
  await productModel.updateProduct(name, id);

  return { status: 200, message: { id, name } };
};

const deleteProduct = async (id) => {
  const checkProduct = await getProductById(id);

  if (checkProduct.status === 404) return checkProduct;

  await productModel.deleteProduct(id);

  return { status: 204 };
};

const doubleProduct = (prod) => {
  const dProd = prod * 2;
  return dProd;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  doubleProduct,
};