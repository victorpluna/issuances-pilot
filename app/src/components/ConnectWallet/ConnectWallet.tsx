import { Button } from 'antd'

import { Column } from '../Flex/Flex'

export const ConnectWallet = ({ activateConnector }) => (
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
)