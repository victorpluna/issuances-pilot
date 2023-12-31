import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import { Column, Row } from 'react-display-flex'
import { PlusOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { ethers } from 'ethers';

import { formatCurrency } from '../../formatters'
import { hooks, metaMask } from '../../metamask-connector'
import { minifyAddress } from '../../formatters/web3'
import abi from '../../contract-abi.json'

import './web3-header.scss'
import { constants } from '../../config/constants';
import { useEffect, useState } from 'react';

export const Web3Header = () => {
  const [balance, setBalance] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { useAccount, useProvider } = hooks;
  const account = useAccount();
  const provider = useProvider();
  const contract = new ethers.Contract(constants.web3.contractAddress, abi, provider.getSigner())

  const getContractBalance = async () => {
    setIsFetching(true);
    const contractBalance = await contract.balanceOf(account);
    const formattedBalance = ethers.utils.formatUnits(contractBalance, 18);
    setBalance(formattedBalance);
    setIsFetching(false);
  };

  useEffect(() => {
    getContractBalance();
  }, []);


  return (
    <Row className="web3-header" justifyContentSpaceBetween>
      <Row className="web3-header-menu">
        <Button type="text" className="success">
          <Column className={classNames({ 'is-loading': isFetching })} justifyContentStart>
            <span>CBDC Balance</span>
            <span>
              <span>
                {formatCurrency({
                  value: balance,
                  minimumPrecision: 0,
                  notation: 'standard',
                })}
              </span>
            </span>
          </Column>
          <PlusOutlined />
        </Button>
        <Tooltip title="Refresh">
          <Button type="text" className="refresh-button" disabled={isFetching} onClick={getContractBalance}>
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
