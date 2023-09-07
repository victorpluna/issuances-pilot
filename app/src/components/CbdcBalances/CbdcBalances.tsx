import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import { Column, Row } from 'react-display-flex'
import { PlusOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons'


import './cbdc-balances.scss'
import { formatCurrency } from '../../formatters'

export const CbdcBalances = () => {
  const cbdcAllowance = 0;
  const cbdcBalance = 0;
  const isFetching = false;

  const hasNoCbdcValues = [cbdcAllowance, cbdcBalance].every((element) => element === undefined)

  return (
    <>
      <Row className="cbdc-balances">
        {cbdcBalance !== undefined && (
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
        )}
        {cbdcAllowance !== undefined && (
          <Button type="text" className="success" onClick={() => {}}>
            <Column className={classNames({ 'is-loading': isFetching })} justifyContentStart>
              <span>Allowance</span>
              <span>
                <span>
                  {formatCurrency({
                    value: cbdcAllowance,
                    minimumPrecision: 0,
                    notation: 'standard',
                  })}
                </span>
              </span>
            </Column>
            <PlusOutlined />
          </Button>
        )}
        {!hasNoCbdcValues && (
          <Tooltip title="Refresh">
            <Button type="text" className="refresh-button" disabled={isFetching} onClick={() => {}}>
              {isFetching ? <LoadingOutlined spin /> : <ReloadOutlined />}
            </Button>
          </Tooltip>
        )}
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
