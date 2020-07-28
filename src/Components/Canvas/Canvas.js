import React, { useState, useMemo, useContext } from 'react';
import uniqueid from 'lodash.uniqueid';
import '../../Styles/Canvas.scss'

const state = new (function () {
    //upload/link/stock
    this.source = 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg';
    //sliders: units2
    this.rows = 6;
    this.blocks = 8;
    this.stripes = 4;
    //slider: background detail 
    this.backgroundSize = 1000000;
    //toggles: stripe shape, background compression, block unity
    this.borderRadius =  true;
    this.compression = false; 
    this.uniformity = false;
    //sliders: shadow intensity, angle, diffusion
    this.shadowIntensity = 1;
    this.shadowAngle = .0;
    this.shadowDiffusion = .0; 
    //toggle: only horizontal, only vertical, woven, default (random)
    this.pattern = 'default'
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

//takes in visibility boolean, relevant background position (object {x,y}), and woven flex direction string
function Block({isVisible, backgroundPosition, wovenDirection}){
    //accesss unit sizes and max limit of stripes per block and blocks per row
    const {unitSizes:{stripeSize, rowSize, blockSize}, maxUnits:{stripeMax}} = useContext(CanvasContext);
    //generate unique id for each stripe in block
    const ids = useMemo(()=> new Array(stripeMax).fill().map(ele => uniqueid()),[stripeMax]);
    //each stripe retrieves a background position using the index of another stripe in order to fragment background
    const [randomIndexes,resetRandomIndexes] = useState(()=>shuffleArray(new Array(stripeMax).fill().map((ele,i) => i)));
    //each block has a randomly assigned flex direction that can be toggled
    const [randomDirection, resetRandomDirection] = useState(['row','column'][Math.floor(Math.random() * 2)]);
    //each block has a randomly assigned flex grow value
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 
    
    
    const flexDirection = {
        default: randomDirection,
        horizontal: 'column',
        vertical: 'row',
        woven: wovenDirection
    }[state.pattern]
    
 
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

    //background size dependant on flex direction of block; calculated here rather than stripe for faster performance
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

    //rerender stripes on click
    const rerenderStripes = () => {
        resetRandomDirection(['row','column'][Math.floor(Math.random() * 2)]);
        resetRandomIndexes(shuffleArray(new Array(stripeMax).fill().map((ele,i) => i)));
    }

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
            onClick={rerenderStripes}
        >
            {stripeComponents}
        </div>
    )
}

//takes in visibility boolean, relevant background positions (object), and relevant woven flex directions (object)
function Row({isVisible, backgroundPositions, wovenPattern}){
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
            wovenDirection={wovenPattern[i]}
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

    //construct woven pattern for stripe direction toggle
    const wovenPattern =  Array(maxUnits.rowMax).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.blockMax).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            if(maxUnits.blockMax%2 === 0) {
                if(i%2 === 0){
                    blocks[j] = j%2 === 0 ? 'column' : 'row'
                }else{
                    blocks[j] = j%2 === 0 ? 'row' : 'column'
                }
            }else {
                blocks[j] = j%2 === 0 ? 'row' : 'column'
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
            wovenPattern={wovenPattern[i]}
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
