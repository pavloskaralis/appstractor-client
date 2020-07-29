import React from 'react';
import Canvas from './Components/Canvas/Canvas'

function App() {
  return (
    <div className="App">
      <Canvas canvasDimensions={{canvasHeight: 576, canvasWidth: 768}} maxUnits={{rowMax: 12, blockMax: 18, stripeMax: 24}}/>
    </div>
  );
}

export default App;
