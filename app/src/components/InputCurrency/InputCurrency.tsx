import { InputNumber, InputNumberProps } from 'formik-antd'

export const InputCurrency = (props: InputNumberProps) => (
  <InputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {...props} />
)
