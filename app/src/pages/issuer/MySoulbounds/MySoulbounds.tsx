import './my-soulbounds.scss'

import { Button, Row as AntdRow, Col, Statistic, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

import { Empty } from '../../../components/Empty/Empty'
import { Column, Row } from '../../../components/Flex/Flex'
import { NetworkError } from '../../../components/NetworkError/NetworkError'
import { constants } from '../../../config/constants'
import { UploadSoulboundModal } from '../UploadSoulbound/UploadSoulboundModal'
import { TokenCard } from '../../../components/TokenCard/TokenCard'
import { formatCurrency } from '../../../formatters'
import abi from '../../../config/contract-abi.json'

export const MySoulbounds = () => {
  const { account, provider } = useWeb3React()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tokens, setTokens] = useState(null)
  
  const getSoulboundTokens = useCallback(async () => {
    const contract = new ethers.Contract(constants.web3.contractAddress, abi, provider.getSigner())
    const myTokens = await contract.getOwnedTokens(account)

    setTokens(myTokens)
  }, [account, provider])
  
  useEffect(() => {
    getSoulboundTokens()
  }, [getSoulboundTokens]);

  const uploadSoulboundToken = async ({ tokenURI }) => {
    const contract = new ethers.Contract(constants.web3.contractAddress, abi, provider.getSigner())
    const tx = await contract.issueDocument(tokenURI)
    await tx.wait()
    await getSoulboundTokens()
    
    setIsModalVisible(false)
  }

  const onUploadDocumentClick = () => {
    setIsModalVisible(true)
  };

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
  }, []);

  if (tokens === null) {
    return (
      <Row flex={1} alignItemsCenter contentCenter>
        <Spin />
      </Row>
    )
  }

  return (
    <Column className="issuances-container" flex={1}>
      <NetworkError error={null}>
        <>
          {tokens?.length === 0 ? (
            <Empty description="There are no documents uploaded">
              <Button size="large" onClick={onUploadDocumentClick} type="primary">
                Upload Document
              </Button>
            </Empty>
          ) : (
            <>
              <Column className="issuances-table">
                <Row  contentBetween>
                  <Row className="statistics" aria-label="issuances-summary">
                    <Statistic title="Currency" value="AUD" />
                    <Statistic
                      title="Open"
                      value={formatCurrency({ value: 0, minimumPrecision: 2 })}
                    />
                  </Row>
                  <Button onClick={onUploadDocumentClick} type="primary" size="large">
                    Upload Document
                  </Button>
                </Row>
              </Column>
              <AntdRow gutter={[16, 24]}>
                {tokens.map((tokenURI, index) => (
                  <Col key={index} className="gutter-row" span={6}>
                    <TokenCard tokenURI={tokenURI} />
                  </Col>
                ))}
              </AntdRow>
            </>
          )}
        </>
      </NetworkError>
      <UploadSoulboundModal visible={isModalVisible} uploadDocument={uploadSoulboundToken} onClose={closeModal} />
    </Column>
  )
}
