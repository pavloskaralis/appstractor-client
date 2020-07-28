import React, { useState, useMemo, useContext } from 'react';
import uniqueid from 'lodash.uniqueid';
import '../Styles/Canvas.scss'

const state = new (function () {

    //upload/link/stock
    this.source = 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg';
    //sliders: units
    this.rows = 3;
    this.blocks = 5;
    this.stripes = 6;
    //slider: background detail
    this.backgroundSize = 1000000;
    //toggle: stripe shape
    this.borderRadius =  false;
    //toggle: background compression
    this.compression = false; 
    //toggle: vertical unity
    this.blockUniformity = false;
    //toggle: horizontal unity
    this.rowUniformity = true;
    //toggle: shadow intensity
    this.shadowIntensity = 1;
    //slider: shadow angle
    this.shadowAngle = .05;
    //slider: shadow diffusion
    this.shadowDiffusion = .05; 
    
    //background position difference between two blocks
    this.xRate = 1/this.blocks * 100; 
    this.yRate = 1/this.rows * 100; 
    //background position difference between two stripes 
    this.xInc = this.xRate/this.stripes;
    this.yInc = this.yRate/this.stripes;
    this.backgroundPositions = Array(this.rows).fill().reduce((a,x,i)=>{
        a[i] = Array(this.blocks).fill().reduce((b,y,j)=>{
            b[j] = {
                x: j * this.xRate,
                y: i * this.yRate
            };
            return b; 
        },{}); 
        return a; 
    },{});
    this.bgHeight = this.canvasHeight/this.rows; 
    this.bgWidth = this.canvasWidth/this.blocks;
})();



function Stripe ({isVisible, backgroundPosition, backgroundSize}) {
    //each stripe has a randomly assigned flex grow value
    const [flexGrow] = useState([1,12,20][Math.floor(Math.random() * 3)]); 
    //access max limit of stripes per block
    const {maxUnits:{stripeMax}} = useContext(CanvasContext);
    //access canvas width 
    const {canvasDimensions:{canvasWidth}} = useContext(CanvasContext);

    const style = {
        backgroundImage: `url(${state.source})`,
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: flexGrow,
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${stripeMax})`,
        borderRadius: state.borderRadius ? `${canvasWidth}px` : '',
        boxShadow: `0px ${canvasWidth * state.shadowAngle}px ${canvasWidth * state.shadowDiffusion}px ${canvasWidth * .0015}px rgba(0,0,0,${state.shadowIntensity})`
    }

    return <div 
        className='stripe'
        style={style}
    ></div>
}

//stripe background positions get shuffled to fragement background image
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

function Block({isVisible, backgroundPosition}){
    //accesss relative stripe size depending on flex direction
    const {unitSizes:{stripeSize, rowSize, blockSize}} = useContext(CanvasContext);
    //access max limit of stripes per block
    const {maxUnits:{stripeMax}} = useContext(CanvasContext);
    //generate unique id for each stripe in block
    const ids = useMemo(()=> new Array(stripeMax).fill().map(ele => uniqueid()),[stripeMax]);
    //each block has a randomly assigned flex direction that can be toggled
    const [flexDirection, toggleFD] = useState(['row','column'][Math.floor(Math.random() * 2)]);
    //each block has a randomly assigned flex grow value
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 
    
    const blockStyle = {
        flexGrow: state.blockUniformity ? 1 : flexGrow,
        flexDirection: flexDirection,
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${state.maxBlocks})`
    }

    //each stripe retrieves a background position using the index of another stripe in order to fragment background
    const stripeIndexes = useMemo(()=> new Array(stripeMax).fill().map((ele,i) => i),[stripeMax]);
    const randomIndexes = useMemo(()=>shuffleArray([...stripeIndexes]),[stripeIndexes]);
    const stripeBackgroundPositions =  useMemo(()=> new Array(ids.length).fill().map((ele,i)=>{
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
    }),[backgroundPosition,stripeSize,flexDirection,ids]);
    
    //background size dependent on flex direction of block 
    const backgroundSize = !state.compression ? `${state.backgroundSize}%` : flexDirection === 'column' ? `
        ${state.backgroundSize}% ${rowSize}px` : `${blockSize}px ${state.backgroundSize}%`

    const stripeComponents = ids.map((id,i)=>{
        return <Stripe  
            key={id} 
            isVisible={i + 1 <= state.stripes} 
            backgroundPosition={stripeBackgroundPositions[i]}
            backgroundSize={backgroundSize}
        />
    })

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

function Row({isVisible, backgroundPositions}){
    //access max limit of blocks per row 
    const {maxUnits:{blockMax}} = useContext(CanvasContext)
    //generate unique id for each block in row
    const ids = useMemo(()=> new Array(blockMax).fill().map(ele => uniqueid()), [blockMax]);
    //each row has a randomly assigned flex grow value
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 
    
    const rowStyle = {
        display: isVisible ? 'flex' : 'none',
        flexGrow: state.rowUniformity ? 1 : flexGrow
    }

    const blockComponents = useMemo(()=> ids.map((id,i)=>{
        //block is visible if its index falls within user set block quantity and exists within visible row
        return <Block 
            key={id} 
            isVisible={i + 1 <= state.blocks && isVisible} 
            backgroundPosition={backgroundPositions[i]} 
        />
    }),[ids,state.blocks,backgroundPositions]);

    
    return (
        <div 
            className='row'
            style={rowStyle}
        >
            {blockComponents}
        </div>
    )
}


const CanvasContext = React.createContext(); 

//takes in 2 objects: {canvasHeight, canvasWidth} and {rowMax, blockMax, stripeMax}
export default function Canvas({canvasDimensions, maxUnits}){
    //generate unique id for each row
    const ids = useMemo(()=>new Array(maxUnits.rowMax).fill().map(ele => uniqueid()),[maxUnits.rowMax]);

    // percentage of canvas a single row or block takes up
    const blockSize = useMemo(()=> 1/state.blocks * 100,[state.blocks]);
    const rowSize = useMemo(()=> 1/state.rows * 100, [state.rows]);
    //percentage of block a single stripes takes up depending on flex direction
    const stripeRowSize = useMemo(()=> blockSize/state.stripes, [blockSize,state.stripes]);
    const stripeColumnSize = useMemo(()=> rowSize/state.stripes, [rowSize, state.stripes]);

    //dissect background image into grid based on user selected row and block quantity
    const backgroundPositions = useMemo(()=> Array(maxUnits.rowMax).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.blockMax).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            blocks[j] = (j + 1 <= state.blocks && i + 1 <= state.rows) ? {
                x: j * blockSize,
                y: i * rowSize
            } : {
                x: '',
                y: ''
            }
            return blocks; 
        },{}); 
        return rows; 
    },{}),[state.rows,state.blocks,blockSize, rowSize]);


    const rowAbsoluteHeight = canvasDimensions.canvasHeight/state.rows; 
    const blockAbsoluteWidth = canvasDimensions.canvasWidth/state.blocks;


    const canvasStyle = {
        //user cannot alter
        height: canvasDimensions.canvasHeight,
        width: canvasDimensions.canvasWidth,
        //user can alter
        backgroundImage: `url(${state.source})`,
        backgroundSize: !state.compression ? `${state.backgroundSize}%` : `${state.backgroundSize}% ${canvasDimensions.canvasHeight}px `
    }

    const rowComponents = useMemo(()=> ids.map((id,i) => {
        //row is visible if its index falls within user set row quantity
        return <Row 
            key={id} 
            isVisible={i + 1 <= state.rows}
            backgroundPositions={backgroundPositions[i]}
        />
    }),[ids, state.rows, backgroundPositions])
    
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