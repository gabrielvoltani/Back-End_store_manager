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

module.exports = {
  newSale,
};