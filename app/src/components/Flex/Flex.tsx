import './flex.scss'

import cx from 'classnames'
import { createElement, DOMAttributes, ReactNode } from 'react'

export enum FlexGapClassNamesEnum {
  tinyGap = 'tiny-gap',
  smallGap = 'small-gap',
  normalGap = 'normal-gap',
}

interface FlexPropsTypes {
  className?: string
  children?: ReactNode
  element?: string
  alignItemsEnd?: boolean
  alignSelfEnd?: boolean
  alignSelfStart?: boolean
  alignItemsStart?: boolean
  alignItemsCenter?: boolean
  alignItemsStretch?: boolean
  contentStart?: boolean
  contentEnd?: boolean
  contentCenter?: boolean
  contentAround?: boolean
  contentEvenly?: boolean
  contentBetween?: boolean
  flexGrowChildren?: boolean
  type?: string
  wrap?: boolean
  flex?: string | number
  style?: object
  flexGap?: FlexGapClassNamesEnum
}

type Props = FlexPropsTypes & DOMAttributes<HTMLElement>

const Layout = ({
  className,
  children,
  element = 'div',
  alignItemsEnd,
  alignSelfEnd,
  alignSelfStart,
  alignItemsStart,
  alignItemsCenter,
  alignItemsStretch,
  contentStart,
  contentEnd,
  contentCenter,
  contentAround,
  contentEvenly,
  contentBetween,
  flexGrowChildren,
  type,
  wrap,
  flex,
  style,
  flexGap,
  ...rest
}: Props) => {
  const mergedStyle = flex ? { ...style, flex } : style
  const flexClassName = cx(
    'flex',
    type,
    className,
    { 'align-items-start': alignItemsStart },
    { 'align-items-center': alignItemsCenter },
    { 'align-items-end': alignItemsEnd },
    { 'align-self-end': alignSelfEnd },
    { 'align-self-start': alignSelfStart },
    { 'align-items-stretch': alignItemsStretch },
    { 'justify-content-start': contentStart },
    { 'justify-content-end': contentEnd },
    { 'justify-content-center': contentCenter },
    { 'justify-content-around': contentAround },
    { 'justify-content-evenly': contentEvenly },
    { 'justify-content-between': contentBetween },
    { 'flex-grow-children': flexGrowChildren },
    { [flexGap]: flexGap },
    { wrap },
  )

  return createElement(element, { ...rest, className: flexClassName, style: mergedStyle }, children)
}

export const Row = (props: Props) => <Layout type="flex-row" {...props} />

export const Column = (props: Props) => <Layout type="flex-column" {...props} />
