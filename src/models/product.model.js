const connection = require('./connectionDB');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');

  return allProducts;
};

const getProductById = async (id) => {
  const [[productByID]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return productByID;
};

const addProduct = async (name) => {
  const [newProduct] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

  return newProduct;
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
};