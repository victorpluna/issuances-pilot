import './issuances.scss'

import { Button } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { Empty } from '../../../components/Empty/Empty'
import { Column } from '../../../components/Flex/Flex'
import { NetworkError } from '../../../components/NetworkError/NetworkError'
// import { SetupIssuance } from '../create-issuance/SetupIssuance'
import { IssuancesTable } from './IssuancesTable'
import { hooks, metaMask } from '../../../metamask-connector'
import { constants } from '../../../config/constants'

const issuanceList = [{
  name: 'Test',
  issuer: '0x35BE4f1Aa18AD52D606E9B2eA257A3416e8030fF',
  targetValue: 1000000,
  minimumLotsValue: 1000,
  remainingValue: 1000000,
  investors: 0,
  isClosed: false,
}];

export const Issuances = () => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [issuanceTableItems, setIssuanceTableItems] = useState(issuanceList);
  const [issuances, setIssuances] = useState(issuanceList);
  const [issuance, setIssuance] = useState(null);

  const isActive = useIsActive();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    })
  }, []);

  const onCreateIssuanceClick = () => {
    setIssuance(null);
    setIsModalVisible(true);
  };

  const closeModal = useCallback(() => {
    setIssuance(null);
    setIsModalVisible(false);
  }, []);

  const activateConnector = () => {
    metaMask.activate(constants.web3.chainId);
  };

  return isActive ? (
    <Column className="issuances-container" flex={1}>
      <NetworkError error={null}>
        {issuances?.length === 0 ? (
          <Empty description="There are no open issuances">
            <Button size="large" onClick={onCreateIssuanceClick} type="primary">
              Create Issuance
            </Button>
          </Empty>
        ) : (
          <IssuancesTable
            issuanceTableItems={issuanceTableItems}
            onIssuanceActionClick={(params) => {}}
            isLoading={!issuanceTableItems.length}
          />
        )}
      </NetworkError>
      {/* <SetupIssuance issuance={issuance} visible={isModalVisible} onClose={closeModal} /> */}
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
