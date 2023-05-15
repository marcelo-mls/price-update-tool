const productModel = require('../models/products.model');

async function getProductsById (payload) {
	const storedProducts = await productModel.getProductsById(payload);
	return storedProducts;
}

module.exports = {
	getProductsById,
};