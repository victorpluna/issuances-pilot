import { constants } from '../config/constants'
import { isNumber } from './is-number'

export const multiplyByCurrencyMultiplicationFactor = (amount: number | string) =>
  isNumber(amount) ? +amount * constants.currencyMultiplicationFactor : null
