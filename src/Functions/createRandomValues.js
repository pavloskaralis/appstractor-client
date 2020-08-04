import shuffleArray from './shuffleArray'



export default function createRandomValues(quantity, maxUnits) {
    return new Array(maxUnits.row).fill().reduce((rows,x,i)=>{
        rows[i] = new Array(maxUnits.block).fill().reduce((blocks,y,j)=>{
            blocks[j] = {
                flexDirection: ['row','column'][Math.floor(Math.random() * 2)],
                flexGrow: [1,3,5][Math.floor(Math.random() * 3)], 
                indexes: shuffleArray(new Array(maxUnits.stripe).fill().map((ele,i) => i),quantity.stripe),
                stripes: new Array(maxUnits.stripe).fill().reduce((stripes,z,k)=> {
                    stripes[k] = {
                        flexGrow: [1,6,10][Math.floor(Math.random() * 3)],
                    }
                    return stripes
                },{})
            }
            return blocks; 
        },{}); 
        return rows; 
    },{});
}

