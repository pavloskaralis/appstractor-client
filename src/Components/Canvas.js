import React, { useState, useEffect } from 'react';
import uniqueid from 'lodash.uniqueid';
import '../Styles/Canvas.scss'

const state = new (function () {
    //static: canvas size
    this.canvasHeight = 400;
    this.canvasWidth = 600; 
    //static: max units
    this.maxRows = 12; 
    this.maxBlocks = 18;
    this.maxStripes = 24; 

    //upload/link/stock
    this.source = 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg';
    //sliders: units
    this.rows = 12;
    this.blocks = 9;
    this.stripes = 3;
    //slider: background detail
    this.backgroundSize = 100000;
    //slider: background shadow
    this.boxShadow = `${this.canvasWidth * .01}px ${this.canvasWidth * .01}px ${this.canvasWidth * .025}px ${this.canvasWidth * .005}px rgba(0,0,0,.5)`; 
    //toggle: stripe shape
    this.borderRadius = false;
    //toggle: background compression
    this.compression = false; 
    

    
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

// console.log(state.backgroundPositions)


function Stripe ({index,direction,position}) {
    const [flexGrow] = useState([1,12,20][Math.floor(Math.random() * 3)]); 
    
    const style = {
        backgroundImage: `url(${state.source})`,
        backgroundSize: !state.compression ? 
            `${state.backgroundSize}%` : direction === 'column' ? `
                ${state.backgroundSize}% ${state.bgHeight}px` : `${state.bgWidth}px ${state.backgroundSize}%`,
        backgroundPosition: `${position.x}% ${position.y}%`,
        flexGrow: flexGrow,
        display: index + 1 <= state.stripes ? 'flex' : 'none',
        flexBasis: `calc(100%/${state.maxStripes})`,
        borderRadius: state.borderRadius ? `${state.canvasWidth}px` : '',
        boxShadow: state.boxShadow
    }

    return <div 
        className='stripe'
        style={style}
    ></div>
}

function Block({index, rowIndex, rowDisplay}){
    const [ids] = useState(new Array(state.maxStripes).fill().map(ele => uniqueid()));
    const [flexDirection, toggleFD] = useState(['row','column'][Math.floor(Math.random() * 2)])
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 
    
    const display = index + 1 <= state.blocks; 

    const positions = new Array(ids.length).fill({x:'',y:''});

    for(let i = 0; i < ids.length; i ++){
        if(display && rowDisplay) {
            positions[i] = flexDirection == 'column' ? {
                x: state.backgroundPositions[rowIndex][index].x,
                y: state.backgroundPositions[rowIndex][index].y + (i * state.yInc)
            } : {
                x: state.backgroundPositions[rowIndex][index].x + (i * state.xInc),
                y: state.backgroundPositions[rowIndex][index].y
            }
        }
    }

    const shuffle = (array) => {
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

    const randomPositions = display && rowDisplay ? shuffle(positions) : positions; 
      

    const style = {
        flexGrow: flexGrow,
        flexDirection: flexDirection,
        display: display ? 'flex' : 'none',
        flexBasis: `calc(100%/${state.maxBlocks})`
    }

    const stripes = ids.map((id,i)=>{
        return <Stripe  
            key={id} 
            index={i} 
            position={randomPositions[i]}
            direction={flexDirection}
        />
    })

    return (
        <div 
            className='block' 
            style={style}
            onClick={()=> toggleFD(FD => FD === 'row' ? 'column' : 'row')}
        >
            {stripes}
        </div>
    )
}

function Row({index}){
    const [ids] = useState(new Array(state.maxBlocks).fill().map(ele => uniqueid()));
    
    const display = index + 1 <= state.rows; 
    
    const style = {
        display: display ? 'flex' : 'none'
    }

    const blocks = ids.map((id,i)=>{
        return <Block key={id} index={i} rowIndex={index} rowDisplay={display}/>
    })

    
    return (
        <div 
            className='row'
            style={style}
        >
            {blocks}
        </div>
    )
}


export default function Canvas(){
    const [ids] = useState(new Array(state.maxRows).fill().map(ele => uniqueid()));

    const style = {
        height: state.canvasHeight,
        width: state.canvasWidth,
        backgroundImage: `url(${state.source})`,
        backgroundSize: `${state.backgroundSize}%`
    }

    const rows = ids.map((id,i) => {
        return <Row key={id} index={i}/>
    })
    
    return (
        <div className='canvas' style={style}>
            {rows}
        </div>
    )
}