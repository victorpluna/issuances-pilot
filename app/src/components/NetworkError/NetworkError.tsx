import { Result } from 'antd'
import { ResultStatusType } from 'antd/lib/result'

interface Props {
  error?: any
  title?: string
  message?: string
  status?: ResultStatusType
  children?: JSX.Element
}

export const NetworkError = ({ error, title = 'Network Error', message, status = 'error', children }: Props) =>
  error ? <Result status={status} title={title} subTitle={message || error.message} /> : children
