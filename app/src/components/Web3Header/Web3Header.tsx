import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import { Column, Row } from 'react-display-flex'
import { PlusOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons'

import { formatCurrency } from '../../formatters'
import { hooks, metaMask } from '../../metamask-connector'
import { minifyAddress } from '../../formatters/web3'

import './web3-header.scss'

export const Web3Header = () => {
  const { useIsActive, useAccount } = hooks;
  const account = useAccount();
  const isActive = useIsActive();
  const cbdcBalance = 0;
  const isFetching = false;

  return isActive && (
    <Row className="web3-header" justifyContentSpaceBetween>
      <Row className="web3-header-menu">
        <Button type="text" className="success">
          <Column className={classNames({ 'is-loading': isFetching })} justifyContentStart>
            <span>CBDC Balance</span>
            <span>
              <span>
                {formatCurrency({
                  value: cbdcBalance,
                  minimumPrecision: 0,
                  notation: 'standard',
                })}
              </span>
            </span>
          </Column>
          <PlusOutlined />
        </Button>
        <Tooltip title="Refresh">
          <Button type="text" className="refresh-button" disabled={isFetching} onClick={() => {}}>
            {isFetching ? <LoadingOutlined spin /> : <ReloadOutlined />}
          </Button>
        </Tooltip>
        {/* {isIssuer && cbdcBalance !== undefined && (
          <Tooltip title="Transaction History">
            <Button type="text" className="refresh-button" onClick={() => setIsHistoryDrawerOpen(true)}>
              <FieldTimeOutlined />
            </Button>
          </Tooltip>
        )} */}
      </Row>
      <Row className="web3-header-wallet" alignItemsCenter>
        <Tooltip title={account}>{minifyAddress(account)}</Tooltip>
        <Button type="link" className="confirm-button" onClick={() => metaMask.resetState()}>
          Disconnect
        </Button>
      </Row>
    </Row>
  )
}
