import { object, string } from 'yup';

export const uploadSoulboundFormErrors = {
  requiredNameField: (fieldName) => `The ${fieldName} is required`,
};

export const initialValues = {
  tokenURI: '',
};

export const uploadSoulboundSchema = object().shape({
  tokenURI: string().required(uploadSoulboundFormErrors.requiredNameField('tokenURI')),
});
