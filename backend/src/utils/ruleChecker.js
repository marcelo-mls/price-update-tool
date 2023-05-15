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

// 6 - O preço final da soma dos componentes é igual ao preço do pacote?

module.exports = {
	checkTheNewPriceIsValid,
	checkNewPriceIsBelowCostPrice,
	checkPriceAdjustmentPercentage,
};