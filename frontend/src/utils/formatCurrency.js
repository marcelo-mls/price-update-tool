export default function formatCurrency(price) {
  if (!price) {
    return ''
  }
  
  const options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return parseFloat(price).toLocaleString('pt-BR', options)
}
