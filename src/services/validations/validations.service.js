const Joi = require('joi');
const productModel = require('../../models/product.model');

const nameValidation = Joi.object({
  name: Joi.string().min(5).required(),
});

const isSaleValid = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const idMax = async (sales) => {
  const maxId = await productModel.maxProductId();

  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].productId > maxId) {
      return { status: 404, message: 'Product not found' };
    }
  }
};

const saleMinimum = async (error) => {
  if (error.details[0].type === 'any.required') {
    return { status: 400, message: error.message };
  }
  if (error.details[0].type === 'number.min') {
    return { status: 422, message: error.message };
  }
};

const validations = async (sales) => {
  const idValidation = await idMax(sales);

  if (idValidation) {
    return idValidation;
  }

  for (let i = 0; i < sales.length; i += 1) {
    const { error } = isSaleValid.validate(sales[i]);
    if (error) {
      return saleMinimum(error);
    }
  }
};

module.exports = {
  nameValidation,
  validations,
};