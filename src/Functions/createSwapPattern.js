export default function swapPattern(maxStripes){
    return new Array(maxStripes - 1).fill().reduce((cycles, x, i) => {
        cycles[i] = new Array(maxStripes - 1 - i).fill().map(ele => Math.round(Math.random() * 1))
        return cycles;
    },{})
}