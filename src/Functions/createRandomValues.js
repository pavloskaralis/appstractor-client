export default function createRandomValues(maxUnits) {
    return new Array(maxUnits.row).fill().reduce((rows,x,i)=>{
        rows[i] = new Array(maxUnits.block).fill().reduce((blocks,y,j)=>{
            blocks[j] = {
                flexDirection: ['row','column'][Math.floor(Math.random() * 2)],
                flexGrow: [1,3,5][Math.floor(Math.random() * 3)], 
                stripes: new Array(maxUnits.stripe).fill().reduce((stripes,z,k)=> {
                    stripes[k] = {
                        flexGrow: [1,3,5][Math.floor(Math.random() * 3)],
                    }
                    return stripes
                },{})
            }
            return blocks; 
        },{}); 
        return rows; 
    },{});
}

