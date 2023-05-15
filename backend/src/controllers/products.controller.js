const productService = require('../services/products.service');

async function getProductsById (req, res) {
	if (!Array.isArray(req.body) || !req.body.length) {
		return res.status(400).send('Invalid or empty codes');
	}

	const csvIds = [];
	const csvValidation = [];

	req.body.forEach((row) => {
		csvIds.push(Number(row.product_code));
		csvValidation.push({
			code: Number(row.product_code),
			newPrice: Number(row.new_price),
			currentPrice: null,
			name: '',
			type: '',
			association: [],
			validation: [],
		});
	});

	const result = await productService.getProductsById({csvIds, csvValidation});

	const responseData = result.map(({code,name,currentPrice,newPrice,validation}) => ({
		code,
		name,
		currentPrice,
		newPrice,
		validation
	}));

	res.status(200).json(responseData);
}

async function updateProductsById (req, res) {
	if (!Array.isArray(req.body) || !req.body.length) {
		return res.status(400).send('Invalid or empty codes');
	}

	const result = await productService.updateProductsById(req.body);

	res.status(result.status).json(result.message);
}

module.exports = {
	getProductsById,
	updateProductsById,
};