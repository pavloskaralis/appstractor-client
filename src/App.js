import React from 'react';
import Canvas from './Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import Nav from './Components/Nav/Nav'
import RenderButtons from './Components/Nav/RenderButtons'
import RenderTabs from './Components/Nav/RenderTabs'

function App() {
  return (
    <Box height='100vh'>
      <Nav 
        buttons={<RenderButtons/>}
        tabs={<RenderTabs/>}
      />
    </Box>
  );
}

export default App;
