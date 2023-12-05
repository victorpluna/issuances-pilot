import './token-card.scss'
import { Card, Button, Typography, Image } from 'antd'
import useSWR from 'swr'
import { FileProtectOutlined } from '@ant-design/icons';

import { fetcher } from '../../config/fetcher'
import { ethers } from 'ethers';

const { Meta } = Card
const { Title } = Typography

interface Props {
  tokenURI: string
  kind: string
  price: number
}

export const TokenCard = ({ tokenURI, price, kind }: Props) => {
  const { data, isLoading } = useSWR(tokenURI, fetcher)
  console.log('tokenURI', tokenURI)
  console.log('data', data)
  
  return (
    <Card
    hoverable
    bordered={false}
    loading={isLoading}
    cover={<Image alt="Document" src={data?.image} fallback={!tokenURI && '/images/protected-image.jpeg'} />}
    actions={[
      <Title level={5}>ETH: {ethers.utils.formatUnits(price, 18)}</Title>,
      <Button type="default"><FileProtectOutlined key="approvals" /> {tokenURI ? 'Check approvals' : 'Request access'}</Button>,
    ]}
  >
    <Meta title={kind} description={data?.description} />
  </Card>
  )
}
