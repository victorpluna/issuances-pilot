import './issuances.scss'

import { Button } from 'antd'
import { useCallback, useState } from 'react'

import { Empty } from '../../components/Empty/Empty'
import { Column } from '../../components/Flex/Flex'
import { NetworkError } from '../../components/NetworkError/NetworkError'
// import { SetupIssuance } from '../create-issuance/SetupIssuance'
import { IssuancesTable } from './IssuancesTable'

export const Issuances = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [issuanceTableItems, setIssuanceTableItems] = useState([])
  const [issuances, setIssuances] = useState([])
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
