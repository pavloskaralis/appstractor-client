import React from 'react'
import Box from '@material-ui/core/Box'

export default function TabPanel({ children, value, index, ...other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box flexGrow={1} display='flex'>
            {children}
          </Box>
        )}
      </div>
    );
}