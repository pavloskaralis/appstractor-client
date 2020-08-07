import React, {useState} from 'react'
import CreatePanel from './CreatePanel/CreatePanel'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import CloudIcon from '@material-ui/icons/Cloud'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import LineStyleIcon from '@material-ui/icons/LineStyle'
import BuildIcon from '@material-ui/icons/Build'
import QuantityControls from '../Controls/QuantityControls'
import ShadowControls from '../Controls/ShadowControls'
import BackgroundControls from '../Controls/BackgroundControls'
import PatternControls from '../Controls/PatternControls'
import RenderControls from '../Controls/RenderControls'
import {useSelector} from 'react-redux'

function a11yProps(index) {
  return {
    id: `createtab-${index}`,
    'aria-controls': `createtabpanel-${index}`,
  };
}


const styles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    width: 'initial',
    flexGrow: 1
  },
  indicator: {
    backgroundColor: theme.palette.secondary.dark
  }
}))

export default function CreatePanels() {
  const classes = styles();
  
  const {quantity, maxUnits, background, pattern, shadow} = useSelector(state => state.canvas);
  const {preset, customPreset, createClicked, firstRender, animation} = useSelector(state => state.interface);
  
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const renderIcon =  <Tooltip title="Render" aria-label="render"><BuildIcon/></Tooltip>
  const quantityIcon = <Tooltip title="Quantity" aria-label="quantity"><LineStyleIcon/></Tooltip>
  const backgroundIcon = <Tooltip title="Background" aria-label="background"><WallpaperIcon/></Tooltip>
  const patternIcon = <Tooltip title="Pattern" aria-label="pattern"><FingerprintIcon/></Tooltip>
  const shadowIcon = <Tooltip title="Shadow" aria-label="shadow"><CloudIcon/></Tooltip>
  return (
    <Box>
      <CreatePanel value={tabValue} index={0}>
        <RenderControls context={{preset, customPreset, createClicked, firstRender, animation}}/>
      </CreatePanel>
      <CreatePanel value={tabValue} index={1}>
        <QuantityControls context={{preset, quantity, maxUnits}}/>
      </CreatePanel>
      <CreatePanel value={tabValue} index={2}>
        <BackgroundControls context={{preset, background}}/>
      </CreatePanel>
      <CreatePanel value={tabValue} index={3}>
        <PatternControls context={{preset, pattern}}/>               
      </CreatePanel>
      <CreatePanel value={tabValue} index={4}>
        <ShadowControls context={{preset, shadow}}/> 
      </CreatePanel>
      <AppBar position='fixed' className={classes.appBar}>
          <Tabs classes={{indicator: classes.indicator}} value={tabValue} onChange={handleTabChange} >
            <Tab icon={renderIcon} aria-label='render' className={classes.tab}  {...a11yProps(0)} />
            <Tab icon={quantityIcon} aria-label='quantity' className={classes.tab}  {...a11yProps(1)} />
            <Tab icon={backgroundIcon} aria-label='background' className={classes.tab}  {...a11yProps(2)} />
            <Tab icon={patternIcon} aria-label='pattern' className={classes.tab}  {...a11yProps(3)} />
            <Tab icon={shadowIcon} aria-label='shadow' className={classes.tab}  {...a11yProps(4)} />
          </Tabs>
      </AppBar>
    </Box>
  )
}