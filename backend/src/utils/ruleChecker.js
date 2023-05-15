// 1 - Os preços estão preenchidos e são valores numéricos validos?
function checkTheNewPriceIsValid(csvProduct) {
	if (typeof csvProduct.newPrice !== 'number' || isNaN(csvProduct.newPrice)) {
		csvProduct.validation.push('Novo preço não é valor um numérico válido');
	}
}

// 3 - O preço de venda dos produtos está abaixo do custo deles?
function checkNewPriceIsBelowCostPrice(csvProduct, storedCostPrice) {
	if (csvProduct.newPrice < Number(storedCostPrice)) {
		csvProduct.validation.push('Abaixo do preço de custo');
	}
}

// 4 - Reajuste é maior ou menor do que 10% do preço atual do produto?
function checkPriceAdjustmentPercentage(csvProduct) {
	if (csvProduct.newPrice < (csvProduct.currentPrice * 0.9)) {
		csvProduct.validation.push('Reajuste menor que 10% do preço atual');
	}

	if ((csvProduct.newPrice > (csvProduct.currentPrice * 1.1))) {
		csvProduct.validation.push('Reajuste maior que 10% do preço atual');
	}
}

// 5 - Produtos/pacotes que possuem associação, tem algum de seus associados no CSV?
function checkAssociation(csvProduct, storedProducts) {
	let hasAssociationInCSV = false;

	const matchedProduct = storedProducts.find(({id}) => id === csvProduct.code);
	const storedIds = storedProducts.map(({id}) => id);

	if(matchedProduct.association.length) {
		const associations = matchedProduct.association.map(({id}) => storedIds.includes(id));
		
		hasAssociationInCSV = associations.some((association) => association === true);

		if(!hasAssociationInCSV) {
			csvProduct.validation.push('Falta reajuste de preço do produto ou pacote associado');
		}
	}
	return hasAssociationInCSV;
}

// 6 - O preço final da soma dos componentes é igual ao preço do pacote?

module.exports = {
	checkTheNewPriceIsValid,
	checkNewPriceIsBelowCostPrice,
	checkPriceAdjustmentPercentage,
	checkAssociation,
};