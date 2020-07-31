import React from 'react';
import Canvas from './Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import Nav from './Components/Nav/Nav'
import RenderTools from './Components/Nav/RenderTools'

function App() {
  return (
    <Box height='100vh'>
      <Nav> 
        <RenderTools/>
      </Nav>
    </Box>
  );
}

export default App;
