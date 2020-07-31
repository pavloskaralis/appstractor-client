import React from 'react';
import Box from '@material-ui/core/Box'
import Home from './Components/Home/Home'
import Nav from './Components/Nav/Nav'
import RenderButtons from './Components/Nav/RenderButtons'
import RenderTabs from './Components/Nav/RenderTabs'

function App() {
  return (
    <Box height='100vh' display='flex' flexDirection='column'>
            <Nav 
                buttons={<RenderButtons/>}
                tabs={<RenderTabs/>}
            />
            <Home/>

    </Box>
  );
}

export default App;
