import './layout.scss'

import { Layout as AntLayout } from 'antd'
import { Row } from 'react-display-flex'
import { Web3Header } from '../Web3Header/Web3Header'
import { hooks } from '../../metamask-connector'

const { Header, Footer, Content } = AntLayout

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const { useIsActive } = hooks;
  const isWeb3Active = useIsActive();
  
  return (
    <AntLayout aria-label="layout" className="layout">
      <Header role="heading">
        <Row alignItemsCenter>
          <img alt="logo" height="50px" src="/images/imperium-logo.svg" />
          {isWeb3Active && <Web3Header />}
        </Row>
      </Header>

      <Content aria-label="content">{children}</Content>

      <Footer aria-label="footer">
        <img alt="grey-imperium-logo" src="/images/grey-imperium.svg" />
      </Footer>
    </AntLayout>
  )
}
