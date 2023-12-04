import { object, string, number } from 'yup';

export const uploadSoulboundFormErrors = {
  requiredNameField: (fieldName) => `The ${fieldName} is required`,
};

export const initialValues = {
  tokenURI: '',
  price: '',
};

export const uploadSoulboundSchema = object().shape({
  tokenURI: string().required(uploadSoulboundFormErrors.requiredNameField('tokenURI')),
  price: number().required(uploadSoulboundFormErrors.requiredNameField('number')),
});
