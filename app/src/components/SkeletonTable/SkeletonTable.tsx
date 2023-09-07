import './skeleton-table.scss'

import { Table, TableProps } from 'antd'
import classNames from 'classnames'
import { generateId } from '../../id-generator'

interface SkeletonTableProps<RecordType> extends TableProps<RecordType> {
  skeletonRows?: number
  fixedHeader?: boolean
}

export const SkeletonTable = ({
  loading,
  dataSource,
  skeletonRows = 3,
  fixedHeader,
  ...rest
}: SkeletonTableProps<any>) => (
  <Table
    className={classNames('skeleton-table', { 'is-loading': loading, 'fixed-header': fixedHeader })}
    dataSource={loading ? [...Array(skeletonRows)].map(() => ({ [rest.rowKey as string]: generateId() })) : dataSource}
    components={loading && { body: { cell: CustomTableCell } }}
    pagination={false}
    {...rest}
  />
)

const CustomTableCell = ({ key }) => (
  <td key={key}>
    <div />
  </td>
)
