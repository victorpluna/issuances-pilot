import './layout.scss'

import { useEffect } from 'react'
import { Layout as AntLayout, Spin } from 'antd'
import { Row } from 'react-display-flex'
import { Web3Header } from '../Web3Header/Web3Header'
import { useWeb3React } from '@web3-react/core'
import { ConnectWallet } from '../ConnectWallet/ConnectWallet'

const { Header, Footer, Content } = AntLayout

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const { isActive, isActivating, connector } = useWeb3React();

  useEffect(() => {
    connector.connectEagerly()
  }, [connector])

  const activateConnector = () => {
    connector.activate()
  }

  if (!isActive && isActivating) {
    return (
      <Row flex alignItemsCenter justifyContentCenter>
        <Spin />
      </Row>
    )
  }
  
  return (
    <AntLayout aria-label="layout" className="layout">
      <Header role="heading">
        <Row alignItemsCenter>
          <img alt="logo" height="50px" src="/images/imperium-logo.svg" />
          {isActive && <Web3Header />}
        </Row>
      </Header>

      <Content aria-label="content">{isActive ? children : <ConnectWallet activateConnector={activateConnector} />}</Content>

      <Footer aria-label="footer">
        <img alt="grey-imperium-logo" src="/images/grey-imperium.svg" />
      </Footer>
    </AntLayout>
  )
}
