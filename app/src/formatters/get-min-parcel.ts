import { divideByCurrencyMultiplicationFactor } from './divide-by'

export const getMinParcel = (issuanceInformation: any) =>
  divideByCurrencyMultiplicationFactor(issuanceInformation?.minimumLotsValue)
