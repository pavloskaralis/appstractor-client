import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    label: {
        // textTransform: 'capitalize',
    },
});

export default function RenderTools(){
    const classes = useStyles();

    return (
        <> 
            <ButtonGroup variant='text' size='small' aria-label='text primary button group'>
                <Button classes={{ label: classes.label}}>Upload</Button>
                <Button classes={{ label: classes.label}}>Link</Button>
                <Button classes={{ label: classes.label}}>Search</Button>
            </ButtonGroup>
            <Box display='flex' width='100%' justifyContent='center'>
                <ButtonGroup size='small'>
                    <Button classes={{ label: classes.label}}>Save</Button>
                </ButtonGroup>
            </Box>     
        </>
    )
}


