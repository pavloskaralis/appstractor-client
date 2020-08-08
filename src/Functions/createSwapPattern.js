export default function swapPattern(maxUnit){
    return new Array(maxUnit - 1).fill().reduce((cycles, x, i) => {
        cycles[i] = new Array(maxUnit - 1 - i).fill().map(ele => Math.round(Math.random() * 1))
        return cycles;
    },{})
}