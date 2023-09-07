import './empty.scss'

import { Empty as AntEmpty } from 'antd'
import { ReactNode } from 'react'
import { Column } from 'react-display-flex'

interface Props {
  description: string
  image?: string
  children?: ReactNode
}

export const defaultLogo = '/images/logo_grey.svg'

export const Empty = ({ description, image = '/images/logo_grey.svg', children }: Props) => {
  return (
    <Column className="empty" element="section" aria-label="no records" flexGrow alignItemsCenter justifyContentCenter>
      <AntEmpty description={<h1>{description}</h1>} image={'/images/logo_grey.svg'}>
        {children}
      </AntEmpty>
    </Column>
  )
}
