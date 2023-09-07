import './layout.scss'

import { Layout as AntLayout } from 'antd'
import { Row } from 'react-display-flex'
import { CbdcBalances } from '../CbdcBalances/CbdcBalances'

const { Header, Footer, Content } = AntLayout

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <AntLayout aria-label="layout" className="layout">
      <Header role="heading">
        <Row justifyContentSpaceBetween>
          <Row alignItemsCenter>
            <img alt="logo" height="50px" src="/images/imperium-logo.svg" />
            <CbdcBalances />
          </Row>
        </Row>
      </Header>

      <Content aria-label="content">{children}</Content>

      <Footer aria-label="footer">
        <img alt="grey-imperium-logo" src="/images/grey-imperium.svg" />
      </Footer>
    </AntLayout>
  )
}
