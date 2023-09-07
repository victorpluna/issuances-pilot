import './filter-item.scss'

import { ReactNode } from 'react'

import { Column } from '../Flex/Flex'

interface Props {
  title?: string
  children: ReactNode
}

export const FilterItem = ({ title = '', children }: Props) => (
  <Column className="filter-item-container">
    <label>{title}</label>
    {children}
  </Column>
)
