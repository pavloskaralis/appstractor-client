import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

export default function ValueLabel( { children, open, value }) {
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
}