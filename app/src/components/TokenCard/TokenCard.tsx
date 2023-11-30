import { Card, Button, Typography } from 'antd'
import useSWR from 'swr'
import { FileProtectOutlined } from '@ant-design/icons';

import { fetcher } from '../../config/fetcher'
import { formatCurrency } from '../../formatters';

const { Meta } = Card
const { Title } = Typography

interface Props {
  tokenURI: string
}

export const TokenCard = ({ tokenURI }: Props) => {
  const { data, isLoading } = useSWR(tokenURI, fetcher)
  
  return (
    <Card
    hoverable
    bordered={false}
    loading={isLoading}
    cover={<img alt="Document" src={data?.image} />}
    actions={[
      <Title level={5}>{formatCurrency({ value: 10, minimumPrecision: 2 })}</Title>,
      <Button type="default"><FileProtectOutlined key="approvals" /> Check approvals</Button>,
    ]}
  >
    <Meta title="University Degree" description={data?.description} />
  </Card>
  )
}
