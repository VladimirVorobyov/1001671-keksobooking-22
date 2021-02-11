'use strict';

const getRandomInteger = function(min,max){
  if(min>=0 && max>=0 && min<max){
    return Math.floor(Math.random()*(max - min) + min);
  }
  return alert('не глупи');
};
const getRandomBuking = function( min, max, range){
  if(min>=0 && max>=0 && min<max){
    return (Math.random() * (max - min) + min).toFixed(range);
  }
  return alert('не глупи');
}

const getArraypush = function(array){
  let list =[];
  for(let i=0; i<getRandomInteger(0,array.length); i++){
    let stance = array[getRandomInteger(0,array.length-1)]
    if(list.indexOf(stance) === -1){
      list.push(stance)
    }
  }
  return list;
}
export{getRandomInteger,getRandomBuking, getArraypush}
