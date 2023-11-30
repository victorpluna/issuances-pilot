import { number, object, string } from 'yup';

export const uploadSoulboundFormErrors = {
  requiredNameField: (fieldName) => `The ${fieldName} is required`,
};

export const initialValues = {
  name: '',
  targetValue: '',
  minimumLotsValue: '',
};

export const uploadSoulboundSchema = object().shape({
  name: string().required(uploadSoulboundFormErrors.requiredNameField('name')),
  targetValue: number().required(uploadSoulboundFormErrors.requiredNameField('target')),
  minimumLotsValue: number().required(uploadSoulboundFormErrors.requiredNameField('minimum lots')),
});
