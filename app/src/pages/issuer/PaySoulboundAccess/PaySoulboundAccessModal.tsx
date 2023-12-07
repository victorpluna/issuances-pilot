import "./pay-soulbound-access-modal.scss"
import { Button, Modal, Typography, Space } from "antd"
import { ethers } from "ethers"
import { useState } from "react"
import { Column } from "react-display-flex"

const { Text } = Typography

interface Props {
  visible: boolean
  token: any
  onClose: () => void
  payDocument: ({ tokenId, price }) => Promise<void>
}

export const PaySoulboundAccessModal = ({ visible, onClose, token, payDocument }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmButton = async () => {
    setIsLoading(true)
    await payDocument(token)
    setIsLoading(false)
  };

  return (
    <Modal
      className="create-issuance-modal"
      centered
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      title="Pay for Access"
      open={visible}
      width="40vw"
      onCancel={onClose}
      footer={(
        <Button
          key="publish-issuance"
          loading={isLoading}
          onClick={handleConfirmButton}
          type="primary"
          size="large"
        >
          Confirm
        </Button>
      )}
    >
      <p>In order to have access for this document, you should confirm the transaction.</p>
      <Column className="document-info">
        <Space>
          <Text>Document: </Text>
          <Text strong>{token?.kind}</Text>
        </Space>
        <Space>
          <Text>Price: </Text>
          <Text strong>{token?.price && ethers.utils.formatUnits(token?.price, 18)} ETH</Text>
        </Space>
      </Column>
    </Modal>
  )
}
