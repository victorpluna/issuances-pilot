import './statistic.scss'

import { Statistic as AntStatistic, StatisticProps } from 'antd'
import { Column } from 'react-display-flex'

interface Props extends StatisticProps {
  subtitle?: string | number
}

export const Statistic = ({ subtitle, ...statisticProps }: Props) => (
  <Column className="statistic">
    <AntStatistic {...statisticProps} />
    {subtitle !== undefined && (
      <sub className="ant-statistic-subtitle">
        <span>{subtitle}</span>
      </sub>
    )}
  </Column>
)
