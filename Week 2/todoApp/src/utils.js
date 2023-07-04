let generateRandomInteger = function(){
    
    let randomFloat = Math.random();
    let randomInt = Math.round(randomFloat * 1000000);
    return randomInt;
} 

let someOtherFunction = function(){
    //this function does nothing
}

module.exports = {
    generateRandomInteger, 
    someOtherFunction
}
