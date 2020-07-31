import React from 'react';
import Box from '@material-ui/core/Box'
import Home from './Components/Home/Home'
import Nav from './Components/Nav/Nav'
import TabContext from './Contexts/TabContext'

function App() {
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <Box height='100vh' display='flex' flexDirection='column'>
      <TabContext.Provider value={{tabValue, handleTabChange}}>
        <Nav/>
        <Home/>
      </TabContext.Provider>          
    </Box>
  );
}

export {TabContext}
export default App;
