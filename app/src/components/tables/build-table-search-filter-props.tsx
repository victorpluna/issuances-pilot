import './build-table-search-filter-props.scss'

import { SearchOutlined } from '@ant-design/icons'
import { Button, InputRef, Input } from 'antd'
import React, { Key } from 'react'
import Highlighter from 'react-highlight-words'

import { Column, Row } from '../Flex'

interface SearchFilterParams {
  dataIndex: string
  displayName?: string
}

export const buildSearchFilterProps = ({ dataIndex, displayName }: SearchFilterParams) => {
  let searchInput: InputRef = null
  let searchText: Key = ''
  let searchedColumn: string = ''

  const handleSearch = ({ selectedKeys, confirm, currentColumnName }: HandleSearchProps) => {
    confirm()
    const [text] = selectedKeys
    searchText = text
    searchedColumn = currentColumnName
  }

  const handleReset = (clearFilters: HandleResetParams) => {
    clearFilters()
    searchText = ''
  }

  return {
    filterDropdown: filterDropdown({ searchInput, handleSearch, handleReset, dataIndex, displayName }),
    filterIcon: filterIcon,
    onFilter: onFilter(dataIndex),
    onFilterDropdownVisibleChange: (visible: boolean) => visible && (() => searchInput.select()),
    render: (text: string) => render(text, searchedColumn, dataIndex, searchText),
  }
}

type FilteredValue = (params: {
  dataIndex: string
  filterState: any
}) => { filteredValue: (Key | boolean)[]; onFilter: (value: string, record: any) => boolean }

export const buildFilteredValue: FilteredValue = ({ dataIndex, filterState }) => ({
  filteredValue: (filterState && filterState[dataIndex] && [filterState[dataIndex]]) || undefined,
  onFilter: onFilter(dataIndex),
})

interface HandleSearchProps {
  selectedKeys: Key[]
  confirm: () => void
  currentColumnName: string
}

type HandleResetParams = () => void

interface FilterDropdownProps {
  searchInput: InputRef
  handleSearch: (params: HandleSearchProps) => void
  handleReset: (params: HandleResetParams) => void
  dataIndex: string
  displayName: string
}

const filterDropdown = ({ handleSearch, handleReset, dataIndex, displayName }: FilterDropdownProps) => ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <Column className="table-search">
    <Column className="ant-form">
      <Input
        placeholder={`Search ${displayName || dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch({ selectedKeys, confirm, currentColumnName: dataIndex })}
        autoFocus
      />
    </Column>
    <Row contentEnd className="table-search-actions">
      <Button onClick={() => handleReset(clearFilters)}>Clear</Button>
      <Button type="primary" onClick={() => handleSearch({ selectedKeys, confirm, currentColumnName: dataIndex })}>
        Search
      </Button>
    </Row>
  </Column>
)

const filterIcon = (filtered: boolean) => (
  <SearchOutlined style={{ color: filtered ? 'var(--primary-color)' : undefined }} />
)

const onFilter = (columnName: string) => (value: string, record: any): boolean =>
  record[columnName] && record[columnName].toString().toLowerCase().includes(value.toLowerCase())

const render = (text: string, searchedColumn: string, columnName: string, searchText: Key) =>
  searchedColumn === columnName ? (
    <Highlighter
      searchWords={[searchText]}
      autoEscape
      textToHighlight={text ? text.toString() : ''}
      className="table-search-highlight"
    />
  ) : (
    text
  )
