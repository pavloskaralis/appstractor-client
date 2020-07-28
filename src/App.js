import React from 'react';
import Canvas from './Canvas Components/Canvas'

function App() {
  return (
    <div className="App">
      <Canvas canvasDimensions={{canvasHeight: 400, canvasWidth: 600}} maxUnits={{rowMax: 12, blockMax: 18, stripeMax: 24}}/>
    </div>
  );
}

export default App;
