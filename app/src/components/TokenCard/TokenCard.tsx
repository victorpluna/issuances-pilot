import './token-card.scss'
import { Card, Button, Typography } from 'antd'
import useSWR from 'swr'
import { FileProtectOutlined } from '@ant-design/icons';

import { fetcher } from '../../config/fetcher'
import { ethers } from 'ethers';

const { Meta } = Card
const { Title } = Typography

interface Props {
  tokenURI: string
  price: number
}

export const TokenCard = ({ tokenURI, price }: Props) => {
  const { data, isLoading } = useSWR(tokenURI, fetcher)
  
  return (
    <Card
    hoverable
    bordered={false}
    loading={isLoading}
    cover={<img alt="Document" src={data?.image} />}
    actions={[
      <Title level={5}>ETH: {ethers.utils.formatUnits(price, 18)}</Title>,
      <Button type="default"><FileProtectOutlined key="approvals" /> Check approvals</Button>,
    ]}
  >
    <Meta title="University Degree" description={data?.description} />
  </Card>
  )
}
