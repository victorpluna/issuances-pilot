import './my-soulbounds.scss'

import { Button, Row as AntdRow, Col, Statistic } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { Empty } from '../../../components/Empty/Empty'
import { Column, Row } from '../../../components/Flex/Flex'
import { NetworkError } from '../../../components/NetworkError/NetworkError'
import { hooks, metaMask } from '../../../metamask-connector'
import { constants } from '../../../config/constants'
import { UploadSoulboundModal } from '../UploadSoulbound/UploadSoulboundModal'
import { ethers } from 'ethers'
import abi from '../../../config/contract-abi.json'
import { TokenCard } from '../../../components/TokenCard/TokenCard'
import { formatCurrency } from '../../../formatters'

const contractAddress = '0xfFa10e3B8D509A3142402E3c3497a4916e4F05AD'
const walletAddress = '0x0397a823bfd50f6C1bbC17cfA0C6B38E463241AD'

export const MySoulbounds = () => {
  const { useIsActive } = hooks;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contract, setContract] = useState(null);
  const [tokens, setTokens] = useState([]);

  const isActive = useIsActive();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const soulboundContract = new ethers.Contract(contractAddress, abi, signer)
    setContract(soulboundContract)
    getSoulboundTokens({ contract: soulboundContract })
  }, []);

  const getSoulboundTokens = async ({ contract }) => {
    const myTokens = await contract.getOwnedTokens(walletAddress);
    console.log('myTokens', myTokens)
    setTokens(myTokens);
  }

  const onCreateIssuanceClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const activateConnector = () => {
    metaMask.activate(constants.web3.chainId);
  };

  return isActive ? (
    <Column className="issuances-container" flex={1}>
      <NetworkError error={null}>
        <>
          {tokens?.length === 0 ? (
            <Empty description="There are no documents uploaded">
              <Button size="large" onClick={onCreateIssuanceClick} type="primary">
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
                  <Button onClick={onCreateIssuanceClick} type="primary" size="large">
                    Upload Document
                  </Button>
                </Row>
              </Column>
              <AntdRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {tokens.map((tokenURI) => (
                  <Col className="gutter-row" span={6}>
                    <TokenCard key={tokenURI} tokenURI={tokenURI} />
                  </Col>
                ))}
              </AntdRow>
            </>
          )}
        </>
      </NetworkError>
      <UploadSoulboundModal visible={isModalVisible} onClose={closeModal} />
    </Column>
  ) : (
    <Column className="empty-state" alignItemsCenter contentCenter>
      <img alt="logo" src="/images/empty-state.png" />
      <Column>
        <h3>Wallet connection</h3>
        <p>Let's connect with your wallet</p>
      </Column>
      <Button type="primary" className="confirm-button" onClick={activateConnector}>
        Connect Wallet
      </Button>
    </Column>
  );
}
