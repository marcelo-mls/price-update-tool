const productService = require('../services/products.service');

async function getProductsById (req, res) {
	if (!req.body) {
		return res.status(400).send('Invalid or empty codes');
	}

	const result = await productService.getProductsById();
	res.status(200).json(result);
}

module.exports = {
	getProductsById,
};