export const currencyFormatter = (currency) => new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
}).format(currency)

export const integerFormatter = (number) => new Intl.NumberFormat().format(number)