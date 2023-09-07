import { sortDates } from '../../sorters/sort-dates'
import { sortNumbers } from '../../sorters/sort-numbers'
import { sortStrings } from '../../sorters/sort-strings'

interface Props {
  dataIndex: string
}

export const sortBoolean = ({ dataIndex }: Props) => (previous, next) => previous[dataIndex] - next[dataIndex]

export const sortTextColumn = ({ dataIndex }: Props) => (previous, next) =>
  sortStrings(previous[dataIndex], next[dataIndex])

export const sortNumericColumn = ({ dataIndex }: Props) => (previous, next) =>
  sortNumbers(previous[dataIndex], next[dataIndex])

export const sortDateColumn = ({ dataIndex }: Props) => (previous, next) => {
  if (!previous[dataIndex] || !next[dataIndex]) return 1

  return sortDates(new Date(previous[dataIndex]), new Date(next[dataIndex]))
}
