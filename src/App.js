import React, {useState} from 'react';
import Box from '@material-ui/core/Box'
import Home from './Components/Home/Home'
import Nav from './Components/Nav/Nav'
import TabContext from './Contexts/TabContext'
import {makeStyles} from '@material-ui/core/styles'
import * as ROUTES from './Routes/routes'

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

  return (
    <Box height='100vh' display='flex' flexDirection='column' >
      <TabContext.Provider value={{tabValue, handleTabChange}}>
        <Nav/>
        <Home/>
      </TabContext.Provider> 
    </Box>
  );
}

export default App;
