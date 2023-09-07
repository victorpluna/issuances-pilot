import './issuances.scss'

import { Button } from 'antd'
import { useCallback, useState } from 'react'

import { Empty } from '../../components/Empty/Empty'
import { Column } from '../../components/Flex/Flex'
import { NetworkError } from '../../components/NetworkError/NetworkError'
// import { SetupIssuance } from '../create-issuance/SetupIssuance'
import { IssuancesTable } from './IssuancesTable'

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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [issuanceTableItems, setIssuanceTableItems] = useState(issuanceList)
  const [issuances, setIssuances] = useState(issuanceList)
  const [issuance, setIssuance] = useState(null)

  const onCreateIssuanceClick = () => {
    setIssuance(null)
    setIsModalVisible(true)
  }

  const closeModal = useCallback(() => {
    setIssuance(null)
    setIsModalVisible(false)
  }, [])

  return (
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
  )
}
