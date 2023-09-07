import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import { Column, Row } from 'react-display-flex'
import { PlusOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons'

import './web3-header.scss'
import { formatCurrency } from '../../formatters'
import { hooks } from '../../metamask-connector'

export const Web3Header = () => {
  const { useIsActive } = hooks;
  const isActive = useIsActive();
  const cbdcBalance = 0;
  const isFetching = false;

  return isActive && (
    <>
      <Row className="cbdc-balances">
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
    </>
  )
}
