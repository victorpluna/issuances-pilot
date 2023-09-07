import './confirmation-popover.scss'

import { Button, Popover, PopoverProps } from 'antd'
import { useState, ReactNode } from 'react'
import { Column, Row } from 'react-display-flex'

export interface ConfirmationPopoverProps extends PopoverProps {
  children: ReactNode
  isVisible: boolean
  disabled?: boolean
  text?: string | React.ReactNode
  title?: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void | Promise<void>
  onVisibleChange?: (visible: boolean) => void
}

export const ConfirmationPopover = ({
  isVisible,
  onConfirm,
  onCancel,
  disabled = false,
  onVisibleChange,
  children,
  placement = 'top',
  text = 'Are you sure?',
  title = 'Confirmation',
}: ConfirmationPopoverProps) => {
  const [isConfirming, setIsConfirming] = useState(false)

  const onConfirmPopover = async () => {
    setIsConfirming(true)
    await onConfirm()
    setIsConfirming(false)
  }

  return (
    <Popover
      overlayClassName="confirmation-popover"
      destroyTooltipOnHide
      placement={placement}
      content={
        <Column role="dialog">
          {text}
          <Row flexGrow>
            <Button aria-label="confirm button" loading={isConfirming} onClick={onConfirmPopover} type="primary">
              Yes
            </Button>
            <Button aria-label="cancel button" disabled={isConfirming} onClick={onCancel}>
              No
            </Button>
          </Row>
        </Column>
      }
      title={<h4>{title}</h4>}
      trigger="click"
      // open={isVisible}
      // onOpenChange={!disabled ? onVisibleChange : undefined}
    >
      {children}
    </Popover>
  )
}
