import React, { useState, useEffect } from 'react';
import uniqueid from 'lodash.uniqueid';
import '../Styles/Canvas.scss'

const state = new (function () {
    this.backgroundSize = 1800;
    this.source = 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg'
    //max 12
    this.rows = 12;
    //max 18
    this.blocks = 13;
    //max 24
    this.stripes = 4;
})();

function Stripe ({index,blockIndex,rowIndex}) {
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 

    const style = {
        backgroundImage: `url(${state.source})`,
        backgroundSize: `${state.backgroundSize}%`,
        flexGrow: flexGrow,
        display: index + 1 <= state.stripes ? 'flex' : 'none'
    }

    useEffect(()=>{
        console.log(blockIndex,rowIndex);
    },[])


    return <div 
        className='stripe'
        style={style}
    ></div>
}

function Block({index, rowIndex}){
    const [ids] = useState(new Array(24).fill().map(ele => uniqueid()));
    const [flexDirection, toggleFD] = useState(['row','column'][Math.floor(Math.random() * 2)])
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 

    const style = {
        flexGrow: flexGrow,
        flexDirection: flexDirection,
        display: index + 1 <= state.blocks ? 'flex' : 'none'
    }

    const stripes = ids.map((id,i)=>{
        return <Stripe  key={id} index={i} blockIndex={index} rowIndex={rowIndex}/>
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
    const [ids] = useState(new Array(18).fill().map(ele => uniqueid()));

    const style = {
        display: index + 1 <= state.rows ? 'flex' : 'none'
    }

    const blocks = ids.map((id,i)=>{
        return <Block key={id} index={i} rowIndex={index} />
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
    const [ids] = useState(new Array(12).fill().map(ele => uniqueid()));

    const rows = ids.map((id,i) => {
        return <Row key={id} index={i}/>
    })
    
    return (
        <div className='canvas'>
            {rows}
        </div>
    )
}