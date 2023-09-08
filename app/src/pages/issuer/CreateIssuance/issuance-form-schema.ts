import { number, object, string } from 'yup';

export const createIssuanceFormErrors = {
  requiredNameField: (fieldName) => `The ${fieldName} is required`,
};

export const initialValues = {
  name: '',
  targetValue: '',
  minimumLotsValue: '',
};

export const createIssuanceInformationSchema = object().shape({
  name: string().required(createIssuanceFormErrors.requiredNameField('name')),
  targetValue: number().required(createIssuanceFormErrors.requiredNameField('target')),
  minimumLotsValue: number().required(createIssuanceFormErrors.requiredNameField('minimum lots')),
});
