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
  onPayButtonClick?: () => void
}

const permissionDeniedMessage = "You don't have access to visualize this document. You should pay the below amount to grant access.";

export const TokenCard = ({ tokenURI, price, kind, onPayButtonClick = () => {} }: Props) => {
  const { data, isLoading } = useSWR(tokenURI, fetcher)
  
  return (
    <Card
    hoverable
    bordered={false}
    loading={isLoading}
    cover={<Image alt="Document" src={data?.image} fallback={!tokenURI && '/images/protected-image.jpeg'} />}
    actions={[
      <Title level={5}>ETH: {ethers.utils.formatUnits(price, 18)}</Title>,
      !tokenURI && <Button onClick={onPayButtonClick} type="default"><FileProtectOutlined key="approvals" /> Pay for access</Button>,
    ]}
  >
    <Meta title={kind} description={data?.description || permissionDeniedMessage} />
  </Card>
  )
}
