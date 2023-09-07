export const isNumber = (value: string | number): boolean => {
  const isTypeOfNumber = typeof value === 'number'
  const isNullOrUndefined = [null, undefined].includes(value)
  const isAnEmptyString = value === ''
  const isNotANumber = Number.isNaN(+value)

  return isTypeOfNumber || (!isNullOrUndefined && !isAnEmptyString && !isNotANumber)
}
