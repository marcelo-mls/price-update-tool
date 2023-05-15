const productService = require('../services/products.service');

async function getProductsById (req, res) {
	if (!Array.isArray(req.body) || !req.body.length) {
		return res.status(400).send('Invalid or empty codes');
	}

	const csvIds = [];
	
	req.body.forEach((row) => {
		csvIds.push(Number(row.product_code));
	});

	const result = await productService.getProductsById(csvIds);
	res.status(200).json(result);
}

module.exports = {
	getProductsById,
};