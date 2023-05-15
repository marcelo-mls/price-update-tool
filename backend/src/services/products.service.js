const productModel = require('../models/products.model');

async function getProductsById (payload) {
	const {csvValidation, csvIds} = payload;

	const storedProducts = await productModel.getProductsById(csvIds);

	csvValidation.forEach((csvRow) => {
		// Os códigos de produtos informados existem?
		if (!storedProducts.map(({id}) => id).includes(csvRow.code)) {
			csvRow.validation.push('Produto inexistente');
		} else {
			const storedProduct = storedProducts.find(({id}) => id === csvRow.code);

			csvRow.name = storedProduct.name;
			csvRow.currentPrice = Number(storedProduct.salesPrice);
			csvRow.association = storedProduct.association;
			csvRow.type = storedProduct.type;
		}
	});

	return csvValidation;
}

module.exports = {
	getProductsById,
};