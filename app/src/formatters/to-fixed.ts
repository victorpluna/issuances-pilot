import { isNumber } from './is-number'

interface ToFixed {
  value: number | string
  precision?: number
  suffix?: string
}

export const toFixed = ({ value, precision = 3, suffix = '' }: ToFixed): string =>
  isNumber(value) ? `${Number(value).toFixed(precision)}${suffix ? `${suffix}` : ''}` : '-'
