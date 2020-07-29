export default function shuffleArray(array, stripeQuantity) {    
    let currentIndex = stripeQuantity, temporaryValue, randomIndex;   
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }  
    return array;
}
