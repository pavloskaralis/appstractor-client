import React, {useState, useEffect} from 'react'
import CreatePanel from './CreatePanel/CreatePanel'
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import Brightness6Icon from '@material-ui/icons/Brightness6'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import LineStyleIcon from '@material-ui/icons/LineStyle'
import BuildIcon from '@material-ui/icons/Build'
import QuantityControls from '../CreateControls/QuantityControls'
import ShadowControls from '../CreateControls/ShadowControls'
import BackgroundControls from '../CreateControls/BackgroundControls'
import PatternControls from '../CreateControls/PatternControls'
import RenderControls from '../CreateControls/RenderControls'
import {useSelector} from 'react-redux'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

function a11yProps(index) {
  return {
    id: `createtab-${index}`,
    'aria-controls': `createtabpanel-${index}`,
  };
}


const styles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  tab: {
    width: 'initial',
    flexGrow: 1
  },
  indicator: {
    top: 0
  }

}))

export default function CreateTabs() {
  const classes = styles();
  const [delay, toggleDelay] = useState(false)

  //delay render of non visible controls to increase page load
  useEffect(()=>{
      setTimeout(()=> toggleDelay(delay => !delay),0)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const {quantity, maxUnits, background, pattern, shadow, image} = useSelector(state => state.canvas);
  const {preset, customPreset, rerenderClicked, createClicked, firstRender, animation} = useSelector(state => state.interface);
  
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const handleTabChange = (event, newBottomNavValue) => {
    setBottomNavValue(newBottomNavValue);
  };

  const renderIcon =  <Tooltip title="Render" aria-label="render"><BuildIcon/></Tooltip>
  const quantityIcon = <Tooltip title="Quantity" aria-label="quantity"><LineStyleIcon/></Tooltip>
  const backgroundIcon = <Tooltip title="Background" aria-label="background"><WallpaperIcon/></Tooltip>
  const patternIcon = <Tooltip title="Pattern" aria-label="pattern"><FingerprintIcon/></Tooltip>
  const shadowIcon = <Tooltip title="Shadow" aria-label="shadow"><Brightness6Icon/></Tooltip>
  return (
    <Box>
      <CreatePanel heading='Render' value={bottomNavValue} index={0}>
        <RenderControls context={{image, rerenderClicked, preset,  customPreset, createClicked, firstRender, animation}}/>
      </CreatePanel>
      <CreatePanel heading='Quantity' value={bottomNavValue} index={1}>
        {delay && <QuantityControls context={{preset, quantity, maxUnits}}/>}
      </CreatePanel>
      <CreatePanel heading='Background' value={bottomNavValue} index={2}>
        {delay && <BackgroundControls context={{preset, background}}/>}
      </CreatePanel>
      <CreatePanel heading='Pattern' value={bottomNavValue} index={3}>
        {delay && <PatternControls context={{preset, pattern}}/> }            
      </CreatePanel>
      <CreatePanel heading='Shadow' value={bottomNavValue} index={4}>
        {delay && <ShadowControls context={{preset, shadow}}/> }
      </CreatePanel>
      <BottomNavigation value={bottomNavValue}  onChange={handleTabChange}>
        <BottomNavigationAction icon={renderIcon} label='Render' aria-label='render' className={classes.tab}  {...a11yProps(0)} />
        <BottomNavigationAction icon={quantityIcon} label='Quantity' aria-label='quantity' className={classes.tab}  {...a11yProps(1)} />
        <BottomNavigationAction icon={backgroundIcon} label='Background' aria-label='background' className={classes.tab}  {...a11yProps(2)} />
        <BottomNavigationAction icon={patternIcon} label='Pattern' aria-label='pattern' className={classes.tab}  {...a11yProps(3)} />
        <BottomNavigationAction icon={shadowIcon} label='Shadow' aria-label='shadow' className={classes.tab}  {...a11yProps(4)} />
      </BottomNavigation>
    </Box>
  )
}