import { Badge, Button, Tag } from 'antd'
import { Link } from 'react-router-dom'

import {
  buildSearchFilterProps,
  sortBoolean,
  sortDateColumn,
  sortNumericColumn,
  sortTextColumn,
} from '../../components/tables'
import { dateHandler } from '../../date/date-handler'
import { divideByCurrencyMultiplicationFactor, toFixed } from '../../formatters'
import { constants } from '../../config/constants'

const { formatDate, newDate } = dateHandler

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
    title: 'Instrument',
    dataIndex: 'instrument',
    sorter: sortTextColumn({ dataIndex: 'instrument' }),
    ...buildSearchFilterProps({ dataIndex: 'instrument' }),
  },
  {
    title: 'Date',
    dataIndex: 'issueDate',
    defaultSortOrder: 'descend',
    sorter: sortDateColumn({ dataIndex: 'issueDate' }),
    render: (date) => date && formatDate({ date: newDate(date) }),
  },
  { title: 'Currency', dataIndex: 'currency' },
  {
    title: `Target (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'targetValue',
    sorter: sortNumericColumn({ dataIndex: 'targetValue' }),
    render: (targetValue: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(targetValue) }),
  },
  {
    title: `EOIs (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'eois',
    sorter: sortNumericColumn({ dataIndex: 'eois' }),
    render: (value: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(value) }),
  },
  {
    title: `Offers (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'offers',
    sorter: sortNumericColumn({ dataIndex: 'offers' }),
    render: (value: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(value) }),
  },
  {
    title: `Accepted (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'accepted',
    sorter: sortNumericColumn({ dataIndex: 'accepted' }),
    render: (value: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(value) }),
  },
  {
    title: `Rejected (${constants.currencyMultiplicationAbbreviation})`,
    dataIndex: 'rejected',
    sorter: sortNumericColumn({ dataIndex: 'rejected' }),
    render: (value: number) => toFixed({ value: divideByCurrencyMultiplicationFactor(value) }),
  },
  {
    title: 'Draft',
    dataIndex: 'isDraft',
    sorter: sortBoolean({ dataIndex: 'isDraft' }),
    render: (isDraft: boolean) => isDraft && <Tag>Draft</Tag>,
  },
  {
    dataIndex: 'entityId',
    align: 'right',
    render: (entityId: string, { isDraft, openEOIsCount }) => (
      <Badge count={openEOIsCount}>
        {isDraft ? (
          <Button type="primary" onClick={() => onIssuanceActionClick({ issuanceEntityId: entityId })}>
            Update
          </Button>
        ) : (
          <Button type="primary">
            <Link to={`/issuances/${entityId}`}>Details</Link>
          </Button>
        )}
      </Badge>
    ),
  },
]
