import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux' 
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormHelperText from '@material-ui/core/FormHelperText'
import renderAppstraction from '../../../Actions/Canvas/renderAppstraction'
import {toggleCreateClicked, toggleRerenderClicked, toggleFirstRender} from '../../../Actions/Interface/allInterfaceActions'

const styles = makeStyles(theme => ({
    title: {
        textTransform: 'uppercase',
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
        textAlign: 'center',
        fontSize: theme.typography.h4.fontSize,
        marginBottom: '-8px',
        [theme.breakpoints.up(450)]: {
            marginBottom: '-14px',
            fontSize: theme.typography.h3.fontSize
        },
        [theme.breakpoints.up('sm')]: {
            marginBottom: '-8px',
            fontSize: theme.typography.h2.fontSize
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: '-24px',
            fontSize: theme.typography.h1.fontSize
        },
        
    },
    slogan: {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightMedium,
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(19),
        [theme.breakpoints.up(450)]: {
            fontSize: theme.typography.pxToRem(27)
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(24)
        },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(44)
        }  
    },
    button: {
        minWidth: 105,
        maxWidth: 105,
        height: 36,
        fontSize: theme.typography.pxToRem(13),
        [theme.breakpoints.up('md')]: {
            minWidth: 120,
            maxWidth: 120, 
            height: 42,
            fontSize: theme.typography.pxToRem(15)
        } 
    }, 
    helperText: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        marginBottom: -22,
    }
}))

export default function GroupA(){
    const classes = styles(); 
    const matches = useMediaQuery('(min-width:600px)');
    const dispatch = useDispatch();
    const {firstRender,rerenderClicked, createClicked} = useSelector(state => state.interface);

    const handleButtonClick = () => {
        //prevent spam render
        if(rerenderClicked || (createClicked && firstRender) ) return

        if(firstRender){
            //enable visibility of stripes; triggers first render animation; resets to false when new image gets selected
            dispatch(toggleCreateClicked(true)); 
            //change animation effect after animation completes; resets to false when new image gets selected 
            //first render transitions opacity, while rerender transitions background
            setTimeout(()=>dispatch(toggleFirstRender(false)),firstRender ? 1800 : 1650)
        } else {
            //enable rerender animation; resets to false after animation completes
            dispatch(toggleRerenderClicked(true))
            setTimeout(()=>dispatch(toggleRerenderClicked(false)),firstRender ? 1800 : 1650)
        }
       
        setTimeout(()=>{
            //create new random values and swap pattern
            dispatch(renderAppstraction());      
        },firstRender ? 300 : 150 )
    }

    return (
   
        <div style={{zIndex:1, width:'100%', display:'flex', flexDirection:'column'}}>
            <Typography className={classes.title}>Appstractor</Typography>
            <div style={{width:'100%', display:'flex', justifyContent:'center', flexDirection:matches ? 'row' : 'column'}}>
                <Typography className={classes.slogan}>Create art with the click of a</Typography>
                <div style={{margin:matches ? '0 0 0 12px' : '4px auto 0 auto', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <Button onClick={handleButtonClick} variant='contained' color='primary' className={classes.button}>Button</Button>
                    <FormHelperText className={classes.helperText}>Click Me!</FormHelperText>
                </div>
            </div>
        </div>
           
    )
}