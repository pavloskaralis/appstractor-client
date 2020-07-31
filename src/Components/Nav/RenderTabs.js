import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    tab: {
        minWidth: 100, // a number of your choice
        width: 100, // a number of your choice
        height: 64,
        minHeight: 64
    },
});

export default function RenderTools(){
    const classes = useStyles();

    return (     
        <Tabs aria-label='Render and Gallery Tabs'>
            <Tab label='Render' classes={{ root: classes.tab}}/>
            <Tab label='Gallery' classes={{ root: classes.tab}}/>
        </Tabs>   
    )
}


