import React from 'react'
import { Tabs } from 'antd'
import { FileSearchOutlined, FileProtectOutlined } from '@ant-design/icons'
import { MySoulbounds } from './MySoulbounds/MySoulbounds'
import { SearchSoulbounds } from './SearchSoulbounds/SearchSoulbounds'

const tabs = [
  { icon: FileProtectOutlined, label: 'My Documents', component: MySoulbounds},
  { icon: FileSearchOutlined, label: 'Search Documents', component: SearchSoulbounds},
]

export const Soulbounds = () => (
  <Tabs
    defaultActiveKey="1"
    items={tabs.map(({ icon: Icon, label, component: Component }, i) => {
      const id = String(i + 1);

      return {
        label: (
          <span>
            <Icon />
            {label}
          </span>
        ),
        key: id,
        children: <Component />,
      };
    })}
  />
)