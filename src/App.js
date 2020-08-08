import React, {useState, useEffect, useRef} from 'react';
import Box from '@material-ui/core/Box'
import Home from './Components/Home/Home'
import Nav from './Components/Nav/Nav'
import ViewportContext from './Contexts/ViewportContext'
import TabContext from './Contexts/TabContext'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
        width: '6px',
        backgroundColor: theme.palette.background.darkDefault,
    },
    '*::-webkit-scrollbar-track': {
        boxshadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        borderRadius: '10px',
    },
    '*::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
        opacity: 1,
        backgroundColor: theme.palette.secondary.dark,
    },
  },
}))

function App() {
  const classes = styles(); 

  //track tab panel indexes
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  //track viewport width for conditional layouts
  const viewportRef = useRef();
  const [viewportWidth, setViewportWidth] = useState();
  //allows useEffect to call current ref since outside the scope
  const updateViewportSize = () => {
    setViewportWidth(viewportRef.current.offsetWidth);
  }
  //retrieve new viewport size on browser resize
  useEffect(()=> {
    window.addEventListener('resize', updateViewportSize);
    updateViewportSize();
    return ()=> window.removeEventListener('resize', updateViewportSize)
  },[]);

  return (
    <Box ref={viewportRef} height='100vh' display='flex' flexDirection='column' >
      <ViewportContext.Provider value={viewportWidth}>
      <TabContext.Provider value={{tabValue, handleTabChange}}>
        <Nav/>
        <Home/>
      </TabContext.Provider> 
      </ViewportContext.Provider>         
    </Box>
  );
}

export default App;
