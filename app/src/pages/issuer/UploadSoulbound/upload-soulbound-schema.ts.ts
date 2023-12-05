import { object, string, number } from 'yup';

export const uploadSoulboundFormErrors = {
  requiredNameField: (fieldName) => `The ${fieldName} is required`,
};

export const initialValues = {
  tokenURI: '',
  price: '',
  kind: '',
};

export const uploadSoulboundSchema = object().shape({
  tokenURI: string().required(uploadSoulboundFormErrors.requiredNameField('tokenURI')),
  price: number().required(uploadSoulboundFormErrors.requiredNameField('number')),
  kind: string().required(uploadSoulboundFormErrors.requiredNameField('kind')),
});
