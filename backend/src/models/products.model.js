const dbConnection = require('./database/connection');

async function getProductsById() {
	const query = `
    SELECT
      code,
      name,
      cost_price AS currentPrice,
      sales_price AS newPrice,
      NULL AS validation
    FROM products;
  `;
	const [result] = await dbConnection.execute(query);

	return result;
}

module.exports = {
	getProductsById,
};