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
  // instrument: mixed()
  //   .oneOf(['Certificate of Deposit', 'Commercial Paper', 'Promissory Note', 'Treasury Bill'])
  //   .required(createIssuanceFormErrors.requiredNameField('instrument')),
  // identification: string().required(createIssuanceFormErrors.requiredNameField('identification')),
  // currency: string().required(createIssuanceFormErrors.requiredNameField('currency')),
  targetValue: number().required(createIssuanceFormErrors.requiredNameField('target')),
  minimumLotsValue: number().required(createIssuanceFormErrors.requiredNameField('minimum lots')),
  // settlementBeforeDate: date().nullable().required(createIssuanceFormErrors.requiredNameField('settlement before')),
  // issueDate: date().nullable().required(createIssuanceFormErrors.requiredNameField('issue date')),
  // closeDate: date().nullable().required(createIssuanceFormErrors.requiredNameField('close date')),
});
