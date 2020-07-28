import React, { useState, useMemo, useContext } from 'react';
import uniqueid from 'lodash.uniqueid';
import '../../Styles/Canvas.scss'

const state = new (function () {

    //upload/link/stock
    this.source = 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg';
    //sliders: units
    this.rows = 12;
    this.blocks = 18;
    this.stripes = 24;
    //slider: background detail
    this.backgroundSize = 10000;
    //toggle: stripe shape
    this.borderRadius =  false;
    //toggle: background compression
    this.compression = true; 
    //toggle: vertical unity
    this.uniformity = false;
    //toggle: shadow intensity
    this.shadowIntensity = 1;
    //slider: shadow angle
    this.shadowAngle = .05;
    //slider: shadow diffusion
    this.shadowDiffusion = .05; 
    
})();

//takes in visibility boolean, background position (object {x.y}),and background size css string
function Stripe ({isVisible, backgroundPosition, backgroundSize}) {
    //access max limit of stripes per block and canvas width
    const {maxUnits:{stripeMax}, canvasDimensions:{canvasWidth}} = useContext(CanvasContext);
    //each stripe has a randomly assigned flex grow value
    const [flexGrow] = useState([1,12,20][Math.floor(Math.random() * 3)]); 
    
    const stripeStyle = {
        backgroundImage: `url(${state.source})`,
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: flexGrow,
        //hides stripe if not visible
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${stripeMax})`,
        borderRadius: state.borderRadius ? `${canvasWidth}px` : '',
        boxShadow: `0px ${canvasWidth * state.shadowAngle}px ${canvasWidth * state.shadowDiffusion}px ${canvasWidth * .0015}px rgba(0,0,0,${state.shadowIntensity})`
    }

    return <div 
        className='stripe'
        style={stripeStyle}
    ></div>
}

//stripe indexes get shuffled to fragement background image
const shuffleArray = (array) => {    
    let currentIndex = state.stripes, temporaryValue, randomIndex;   
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }  
    return array;
}

//takes in visibility boolean and relevant background position (object {x,y})
function Block({isVisible, backgroundPosition}){
    //accesss unit sizes and max limit of stripes per block
    const {unitSizes:{stripeSize, rowSize, blockSize}, maxUnits:{stripeMax} } = useContext(CanvasContext);
    //generate unique id for each stripe in block
    const ids = useMemo(()=> new Array(stripeMax).fill().map(ele => uniqueid()),[stripeMax]);
    //each block has a randomly assigned flex direction that can be toggled
    const [flexDirection, toggleFD] = useState(['row','column'][Math.floor(Math.random() * 2)]);
    //each block has a randomly assigned flex grow value
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 
    
    //each stripe retrieves a background position using the index of another stripe in order to fragment background
    const randomIndexes = useMemo(()=>shuffleArray(new Array(stripeMax).fill().map((ele,i) => i)),[stripeMax]);
    //calculate fragmented background positions
    const fragmentedBackgroundPositions = new Array(ids.length).fill().map((ele,i)=>{
        //if block and stripe are visible
        if(isVisible && i + 1 <= state.stripes) {
            //return stripe background positions based on flex direction
            return flexDirection === 'column' ? {
                x: backgroundPosition.x,
                y: backgroundPosition.y + (i * stripeSize.column)
            } : {
                x: backgroundPosition.x + (i * stripeSize.row),
                y: backgroundPosition.y
            }
        }
        //otherwise return empty positions
        return {x:'',y:''}      
    })

    //background size dependent on flex direction of block 
    const backgroundSize = !state.compression ? `${state.backgroundSize}%` : flexDirection === 'column' ? `
        ${state.backgroundSize}% ${rowSize}px` : `${blockSize}px ${state.backgroundSize}%`

    const stripeComponents = ids.map((id,i)=>{
        //stripe is visible if its index falls within user set stripe quantity
        //each stripe is passed a random fragmented background position 
        return <Stripe  
            key={id} 
            isVisible={isVisible && i + 1 <= state.stripes} 
            backgroundPosition={fragmentedBackgroundPositions[randomIndexes[i]]}
            backgroundSize={backgroundSize}
        />
    })

    const blockStyle = {
        //toggles between random and uniform flexGrow 
        flexGrow: state.uniformity ? 1 : flexGrow,
        flexDirection: flexDirection,
        //hides block if not visible
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${state.maxBlocks})`
    }

    return (
        <div 
            className='block' 
            style={blockStyle}
            onClick={()=> toggleFD(FD => FD === 'row' ? 'column' : 'row')}
        >
            {stripeComponents}
        </div>
    )
}

//takes in visibility boolean, and relevant background positions (object)
function Row({isVisible, backgroundPositions}){
    //access max limit of blocks per row 
    const {maxUnits:{blockMax}} = useContext(CanvasContext)
    //generate unique id for each block in row
    const ids = useMemo(()=> new Array(blockMax).fill().map(ele => uniqueid()), [blockMax]);
  
    const blockComponents = ids.map((id,i)=>{
        //block is visible if its index falls within user set block quantity and exists within visible row
        return <Block 
            key={id} 
            isVisible={i + 1 <= state.blocks && isVisible} 
            backgroundPosition={backgroundPositions[i]} 
        />
    });

    const rowStyle = {
        //hides block if not visible
        display: isVisible ? 'flex' : 'none'
    }

    return (
        <div 
            className='row'
            style={rowStyle}
        >
            {blockComponents}
        </div>
    )
}

//passes canvas dimensions, max unit limits, and current unit sizes
const CanvasContext = React.createContext(); 

//takes in 2 objects: {canvasHeight, canvasWidth} and {rowMax, blockMax, stripeMax}
export default function Canvas({canvasDimensions, maxUnits}){
    //generate unique id for each row
    const ids = useMemo(()=>new Array(maxUnits.rowMax).fill().map(ele => uniqueid()),[maxUnits.rowMax]);

    //absolute height of block and width; passed to blocks for background compression
    const rowAbsoluteHeight = canvasDimensions.canvasHeight/state.rows;
    const blockAbsoluteWidth = canvasDimensions.canvasWidth/state.blocks;
    //percentage of canvas a single row or block takes up; used to calculate background positions
    const blockRelativeSize = 1/state.blocks * 100
    const rowRelativeSize = 1/state.rows * 100;
    //percentage of block a single stripe takes up depending on flex direction; passed to blocks to fragment background
    const stripeRowSize = blockRelativeSize/state.stripes
    const stripeColumnSize = rowRelativeSize/state.stripes

    //dissect background image into grid based on user selected row and block quantity
    const backgroundPositions = Array(maxUnits.rowMax).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.blockMax).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            blocks[j] = (j + 1 <= state.blocks && i + 1 <= state.rows) ? {
                x: j * blockRelativeSize,
                y: i * rowRelativeSize
            } : {
                x: '',
                y: ''
            }
            return blocks; 
        },{}); 
        return rows; 
    },{});


    const rowComponents = ids.map((id,i) => {
        //row is visible if its index falls within user set row quantity
        //each row is passed relevant background positions 
        return <Row 
            key={id} 
            isVisible={i + 1 <= state.rows}
            backgroundPositions={backgroundPositions[i]}
        />
    })

    const canvasStyle = {
        //user cannot alter
        height: canvasDimensions.canvasHeight,
        width: canvasDimensions.canvasWidth,
        //user can alter
        backgroundImage: `url(${state.source})`,
        backgroundSize: !state.compression ? `${state.backgroundSize}%` : `${state.backgroundSize}% ${canvasDimensions.canvasHeight}px `
    }

    return (
        <CanvasContext.Provider value={{
            canvasDimensions, 
            maxUnits, 
            unitSizes: {rowSize: rowAbsoluteHeight, blockSize: blockAbsoluteWidth, stripeSize: {row: stripeRowSize, column: stripeColumnSize}}
        }}>
            <div className='canvas' style={canvasStyle}>
                {rowComponents}
            </div>
        </CanvasContext.Provider>
    )
}
