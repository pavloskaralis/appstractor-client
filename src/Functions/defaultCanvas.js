import shuffleArray from './shuffleArray'

class defaultCanvas {
    constructor(){
        //upload/link/stock
        this.image = 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg';
        //sliders
        this.quantity = {
            row: 6,
            block: 9,
            stripe: 12
        };
        //radio random, horizontal, vertical, woven
        this.pattern = 'random';
        this.background = {
            //slider
            detail: 5000,
            //togles
            ellipse: false,
            stretch: true,
            uniform: true
        };
        //sliders
        this.shadow = {
            opacity: .5,
            angle: .01,
            size: .01
        };
        //static
        this.maxUnits = {
            row: 12, 
            block: 18, 
            stripe: 24
        };
        //randomValues
        this.randomValues = new Array(this.maxUnits.row).fill().reduce((rows,x,i)=>{
            rows[i] = new Array(this.maxUnits.block).fill().reduce((blocks,y,j)=>{
                blocks[j] = {
                    flexDirection: ['row','column'][Math.floor(Math.random() * 2)],
                    flexGrow: [1,3,5][Math.floor(Math.random() * 3)], 
                    indexes: shuffleArray(new Array(this.maxUnits.stripe).fill().map((ele,i) => i),this.quantity.stripe),
                    stripes: new Array(this.maxUnits.stripe).fill().reduce((stripes,z,k)=> {
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
}

export default new defaultCanvas(); 