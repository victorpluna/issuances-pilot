import { Button } from 'antd'
import classNames from 'classnames'

import { Column, Row } from '../../../components/Flex'
import { SkeletonTable } from '../../../components/SkeletonTable/SkeletonTable'
import { Statistic } from '../../../components/Statistic/Statistic'
import { formatCurrency } from '../../../formatters'
import { sumTargetValues } from './issuances-summary-calculator'
import { buildIssuancesColumns } from './issuances-table-columns'

interface Props {
  issuanceTableItems: any[]
  onIssuanceActionClick: () => void
  isLoading?: boolean
}
export const IssuancesTable = ({ issuanceTableItems, onIssuanceActionClick, isLoading = false }: Props) => {
  const issuancesColumns = buildIssuancesColumns({ onIssuanceActionClick })

  return (
    <Column className={classNames('issuances-table', { 'is-loading': isLoading })}>
      <Row contentBetween>
        <Row className="statistics" aria-label="issuances-summary">
          <Statistic title="Currency" value="AUD" />
          <Statistic
            title="Open"
            value={formatCurrency({ value: sumTargetValues({ tableItems: issuanceTableItems }) })}
          />
        </Row>
        <Button onClick={onIssuanceActionClick} type="primary" size="large">
          Create Issuance
        </Button>
      </Row>
      <Column>
        <SkeletonTable
          loading={isLoading}
          columns={issuancesColumns as any[]}
          dataSource={issuanceTableItems}
          rowKey="id"
          data-testid="issuances-table"
          fixedHeader
        />
      </Column>
    </Column>
  )
}
