const connection = require('./connectionDB');

const newSale = async (sales) => {
  const [saleId] = await connection.execute('INSERT INTO sales (date) values (NOW())');
  const id = saleId.insertId;
  const promises = [];
  sales.forEach((element) => {
    const insertQuery = `INSERT INTO sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const insert = connection.execute(insertQuery, [id, element.productId, element.quantity]);
    promises.push(insert);
  });

  await Promise.all(promises);

  return saleId.insertId;
};

const getAllSales = async () => {
  const query = `SELECT sp.sale_id as saleId, sale.date, sp.product_id as productId, sp.quantity 
  FROM sales as sale
  INNER JOIN sales_products as sp on (sale.id = sp.sale_id)
  ORDER BY sp.sale_id, product_id`;

  const [allSales] = await connection.execute(query);

  return allSales;
};

const getSaleById = async (id) => {
  const query = `SELECT sale.date, sp.product_id as productId, sp.quantity
  FROM sales as sale
  INNER JOIN sales_products as sp on (sale.id = sp.sale_id)
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id, product_id`;

  const [saleById] = await connection.execute(query, [id]);
  return saleById;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id=?', [id]);
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  deleteSale,
};