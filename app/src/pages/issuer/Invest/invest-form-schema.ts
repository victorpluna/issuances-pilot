import { number, object, string } from 'yup';

export const investFormErrors = {
  requiredNameField: (fieldName) => `The ${fieldName} is required`,
};

export const initialValues = {
  amount: '',
};

export const investSchema = object().shape({
  amount: number().required(investFormErrors.requiredNameField('amount')),
});
