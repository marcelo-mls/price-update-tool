const dbConnection = require('./database/connection');

async function getProductsById(ids) {
	// eslint-disable-next-line no-unused-vars
	const placeholders = ids.map((_id) => '?').join(', ');

	const subQueryForRelatedProducts = `
		SELECT
			JSON_ARRAYAGG(JSON_OBJECT(
				'id', packs.product_id,
				'qty', packs.qty,
				'salesPrice', p_prod.sales_price)) AS related_products
		FROM packs
		JOIN products p_prod ON packs.product_id = p_prod.code
		WHERE packs.pack_id = main.code
		GROUP BY packs.pack_id
	`;
	const subQueryForRelatedPacks = `
		SELECT
			JSON_ARRAYAGG(JSON_OBJECT(
				'id', packs.pack_id,
				'salesPrice', p_pack.sales_price)) AS related_packs
		FROM packs
		JOIN products p_pack ON packs.pack_id = p_pack.code
		WHERE packs.product_id = main.code
		GROUP BY packs.product_id
 	`;
	const mainQuery = `
		SELECT
			main.code AS id,
			main.name AS name,
			main.cost_price AS costPrice,
			main.sales_price AS salesPrice,
			CASE
				WHEN main.code IN (SELECT packs.pack_id FROM packs) THEN 'pacote'
				WHEN main.code IN (SELECT packs.product_id FROM packs) THEN 'produto vinculado a pacote'
				ELSE 'produto'
			END AS type,
			CASE
				WHEN main.code IN (SELECT packs.pack_id FROM packs) THEN (${subQueryForRelatedProducts})
				WHEN main.code IN (SELECT packs.product_id FROM packs) THEN (${subQueryForRelatedPacks})
				ELSE JSON_ARRAY()
			END AS association
		FROM products AS main
		WHERE main.code IN (${placeholders})
  `;
	const [result] = await dbConnection.execute(mainQuery,	[...ids]);

	return result;
}

module.exports = {
	getProductsById,
};