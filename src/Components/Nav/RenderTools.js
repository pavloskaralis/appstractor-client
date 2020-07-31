import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    tabs: {
        height: 32,
        minHeight: 32
    },
    tab: {
        minWidth: 100, // a number of your choice
        width: 100, // a number of your choice
        height: 32,
        minHeight: 32
    },
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
            <ButtonGroup size='small'>
                <Button classes={{ label: classes.label}}>Save</Button>
            </ButtonGroup>
            <Tabs aria-label='Render and Gallery Tabs' classes={{ root: classes.tabs}}>
                <Tab label='Render' classes={{ root: classes.tab }}/>
                <Tab label='Gallery' classes={{ root: classes.tab }}/>
            </Tabs>  
        </>
    )
}


