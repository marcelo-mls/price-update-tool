const productModel = require('../models/products.model');
const rules = require('../utils/ruleChecker');

async function searchAndValidateProductsById (payload) {
	const {csvValidation, csvIds} = payload;

	const storedProducts = await productModel.searchAndValidateProductsById(csvIds);

	csvValidation.forEach((csvRow) => {
		rules.checkTheNewPriceIsValid(csvRow);

		// 2 - Os códigos de produtos informados existem?
		if (!storedProducts.map(({id}) => id).includes(csvRow.code)) {
			csvRow.validation.push('Produto inexistente');
		} else {
			const storedProduct = storedProducts.find(({id}) => id === csvRow.code);

			csvRow.name = storedProduct.name;
			csvRow.currentPrice = Number(storedProduct.salesPrice);
			csvRow.association = storedProduct.association;
			csvRow.type = storedProduct.type;

			rules.checkNewPriceIsBelowCostPrice(csvRow, storedProduct.costPrice);
			rules.checkPriceAdjustmentPercentage(csvRow);
			const hasAssociationInCSV = rules.checkAssociation(csvRow, storedProducts);

			if (hasAssociationInCSV) {

			}
		}
	});

	return csvValidation;
}

async function updateProductsById (payload) {
	const result = await productModel.updateProductsById(payload);
	return result;
}

module.exports = {
	searchAndValidateProductsById,
	updateProductsById,
};