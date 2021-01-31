' use strict';

const getRandomInteger = function(min,max){
  if(min>=0 && max>=0 && min<max){
    return Math.random() * (max - min) + min;
  }
  return alert('не глупи');
};

alert(getRandomInteger(0,100));

const getRandomBuking = function( min, max, range){
  if(min>=0 && max>=0 && min<max){
    return (Math.random() * (max - min) + min).toFixed(range);
  }
  return alert('не глупи');
}
alert(getRandomBuking(0,100,2));
