// 1 - Os preços estão preenchidos e são valores numéricos validos?
function checkTheNewPriceIsValid(csvProduct) {
	if (typeof csvProduct.newPrice !== 'number' || isNaN(csvProduct.newPrice)) {
		csvProduct.validation.push('Novo preço não é valor um numérico válido');
	}
}

module.exports = {
	checkTheNewPriceIsValid,
};