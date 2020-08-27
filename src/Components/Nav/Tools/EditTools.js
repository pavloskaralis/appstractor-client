import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import {makeStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BlockIcon from '@material-ui/icons/Block'
import {useSelector, useDispatch} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import loadPreset from '../../../Actions/Canvas/loadPreset'
import {useFirestoreConnect} from 'react-redux-firebase'
import {setPreset, toggleEdit, toggleFirstRender, toggleCreateClicked, toggleCapture, toggleRendering, resetInterface} from '../../../Actions/Interface/allInterfaceActions'
import {Redirect, useHistory} from 'react-router-dom'
import { PAGE_NOT_FOUND } from '../../../Routes/routes';
import resetCanvas from '../../../Actions/Canvas/resetCanvas';
import setImage from '../../../Actions/Canvas/setImage';

const styles = makeStyles(theme => ({
    saveButton: {
        marginRight: theme.spacing(1.5),
    },
    cancelButton: {
        minWidth: 75
    },
    iconButton: {
         color: theme.palette.text.primary,
    }, 
    title:{
        fontWeight: theme.typography.h6.fontWeight,
        fontSize: theme.typography.pxToRem(16),
        margin: '0 auto',
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.h6.fontSize,
            width: 204,
            margin: 0,
            marginLeft: theme.spacing(1.5)
        }
    },
}))

export default function EditTools({title}){
    const classes = styles();
    const matches = useMediaQuery('(min-width:600px)');
    const dispatch = useDispatch();
    const history = useHistory();
    const uid = useSelector(state => state.firebase.auth.uid);
    useFirestoreConnect([ { collection: 'users', doc: uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);
    const [target, setTarget] = useState(null);

    useEffect(()=>{
        if(typeof appstractions === 'undefined') return;
        const target = Object.entries(appstractions).find(([key,val]) => val.title === title); 
        setTarget(target[0]);
        if(!target) return;
        dispatch(setImage(target[1].state.image));
        setTimeout(()=>{
            dispatch(loadPreset(target[1].state));
            setTimeout(()=>{
                dispatch(toggleCreateClicked(true)); 
                dispatch(toggleEdit(false));
                dispatch(setPreset('custom'));
                dispatch(toggleFirstRender(true));
            },0)
        },0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appstractions])


    //reset canvas when leaving editor
    useEffect(()=> {
        dispatch(toggleEdit(true));
        dispatch(toggleRendering(true));
        return ()=> {
            dispatch(toggleEdit(false));
            dispatch(resetCanvas());
            dispatch(resetInterface());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const saveClick = () => {
        setTimeout(()=>{
            dispatch(toggleCapture(target));
        },150)
    }

    const cancelClick = () => {
        history.push('/gallery');
    }

    return (
        <> 
            {typeof appstractions !== 'undefined' && typeof target === 'undefined' && <Redirect to={PAGE_NOT_FOUND}/>}

            {matches ? 
                <>
                    <Typography className={classes.title}>{title}</Typography>
                    <Button onClick={saveClick} className={classes.saveButton} size='small' startIcon={<SaveIcon/>} variant='outlined'>Save</Button>
                    <Button onClick={cancelClick} className={classes.cancelButton} size='small'  variant='outlined'>Cancel</Button>
                </> :
                <>
                    
                    <IconButton onClick={saveClick} className={classes.iconButton} aria-label='save'>
                        <Tooltip title="Save" aria-label="save">
                            <SaveIcon />
                        </Tooltip>
                    </IconButton> 
                    <IconButton className={classes.iconButton} aria-label='cancel' onClick={cancelClick}>
                        <Tooltip title="Cancel" aria-label="cancel">
                            <BlockIcon />
                        </Tooltip>
                    </IconButton> 
                    <Typography className={classes.title}>{title}</Typography>

                </>
            }    

        </>
    )
}


