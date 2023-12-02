import { Tabs } from 'antd'
import { FileSearchOutlined, FileProtectOutlined } from '@ant-design/icons'
import { MySoulbounds } from './MySoulbounds/MySoulbounds'
import { SearchSoulbounds } from './SearchSoulbounds/SearchSoulbounds'
import { Column } from 'react-display-flex'

const tabs = [
  { icon: FileProtectOutlined, label: 'My Documents', component: MySoulbounds},
  { icon: FileSearchOutlined, label: 'Search Documents', component: SearchSoulbounds},
]

export const Soulbounds = () => (
  <Column className="container">
    <Tabs
      defaultActiveKey="1"
      size="large"
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
  </Column>
)