import React from 'react';
import Canvas from './Canvas Components/Canvas'

function App() {
  return (
    <div className="App">
      <Canvas canvasDimensions={{height: 400, width: 600}} maxUnits={{rows: 12, blocks: 18, stripes: 24}}/>
    </div>
  );
}

export default App;
