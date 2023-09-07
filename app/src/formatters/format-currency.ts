import { constants } from '../config/constants'
import { isNumber } from './is-number'

const defaultMinimumPrecision = 0

interface FormatCurrency {
  value: number | string
  locale?: string
  currency?: string
  currencyDisplay?: 'symbol' | 'code'
  notation?: 'standard' | 'compact'
  minimumPrecision?: number
  maximumPrecision?: number
}

export const formatCurrency = ({
  value,
  locale = constants.defaultLocale,
  currency = constants.defaultCurrency,
  currencyDisplay = 'symbol',
  notation = 'compact',
  minimumPrecision = defaultMinimumPrecision,
  maximumPrecision,
}: FormatCurrency): string => {
  if (!isNumber(value)) {
    return '-'
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay,
    notation,
    minimumFractionDigits: minimumPrecision,
    maximumFractionDigits: maximumPrecision,
  }).format(+value)
}
