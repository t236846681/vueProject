import { numberCurrency } from '../../utils/numberCurrency'

export const toCurrency = function (num, fixed = 2) {
    return numberCurrency(num, fixed)
}
