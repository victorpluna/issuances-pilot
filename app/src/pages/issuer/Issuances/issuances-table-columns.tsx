import { Badge, Button, Tag, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import {
  buildSearchFilterProps,
  sortBoolean,
  sortNumericColumn,
  sortTextColumn,
} from '../../../components/tables'
import { divideByCurrencyMultiplicationFactor, toFixed } from '../../../formatters'
import { constants } from '../../../config/constants'
import { minifyAddress } from '../../../formatters/web3'

export const buildIssuancesColumns = ({
  onIssuanceActionClick,
}: {
  onIssuanceActionClick: ({ issuanceEntityId }) => void
}) => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: sortTextColumn({ dataIndex: 'name' }),
    ...buildSearchFilterProps({ dataIndex: 'name' }),
  },
  {
    title: 'Issuer',
    dataIndex: 'issuer',
    sorter: sortTextColumn({ dataIndex: 'issuer' }),
    ...buildSearchFilterProps({ dataIndex: 'issuer' }),
    render: (issuerAddress) => (
      <Tooltip title={issuerAddress}>
        {minifyAddress(issuerAddress)}
      </Tooltip>
    ),
  },

  {
    title: `Target (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'targetValue',
    sorter: sortNumericColumn({ dataIndex: 'targetValue' }),
    render: (targetValue: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(targetValue) }),
  },
  {
    title: `Minimun Lots (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'minimumLotsValue',
    sorter: sortNumericColumn({ dataIndex: 'minimumLotsValue' }),
    render: (minimumLotsValue: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(minimumLotsValue) }),
  },
  {
    title: `Remaining Value (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'remainingValue',
    sorter: sortNumericColumn({ dataIndex: 'remainingValue' }),
    render: (remainingValue: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(remainingValue) }),
  },
  {
    title: 'Investors',
    dataIndex: 'investors',
    sorter: sortNumericColumn({ dataIndex: 'investors' }),
  },
  {
    title: 'Status',
    dataIndex: 'isClosed',
    sorter: sortBoolean({ dataIndex: 'isClosed' }),
    render: (isClosed: boolean) => <Tag>{isClosed ? 'Closed' : 'Open'}</Tag>,
  },
  {
    dataIndex: 'entityId',
    align: 'right',
    render: (entityId: string) => (
      <Badge>
        <Button type="primary">
            <Link to={`/issuances/${entityId}`}>Invest</Link>
          </Button>
      </Badge>
    ),
  },
]