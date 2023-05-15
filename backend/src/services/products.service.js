const productModel = require('../models/products.model');

async function getProductsById () {
	const storedProducts = await productModel.getProductsById();
	return storedProducts;
}

module.exports = {
	getProductsById,
};