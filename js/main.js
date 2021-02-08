' use strict';
const AD_LIST_NUMBER = 10;
let TYPE_HOUSES = ['palace', 'flat', 'house', 'bungalow'];
let TIMES_FRAME = ['12:00', '13:00', '14:00'];
let FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let HOUSES_IMG = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let  TITLES_DESCRIPTION =['квартира','дом', 'общага', 'хостел', 'дворец'];
let LIST_DESCRIPTION = ['зато всегда очень чисто','у нас очень круто и молодежно','для большой компании','увидешь когда заедешь'];

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
const getAd = function (){
  const locationXY = {
    x:getRandomBuking(35.65000,35.70000,5),
    y:getRandomBuking(139.70000,139.80000,5),
  }
  const author={
    avatar:'img/avatars/user0' + getRandomInteger(1,8)+'.png',
  }
  const offer = {
    title:TITLES_DESCRIPTION[getRandomInteger(0,TITLES_DESCRIPTION.length -1)],
    address: locationXY.x+', '+locationXY.y,
    price: getRandomInteger(1000,8000),
    type: TYPE_HOUSES[getRandomInteger(0,TYPE_HOUSES.length-1)],
    rooms: getRandomInteger(1,8),
    guests: getRandomInteger(1,8),
    checkin: TIMES_FRAME[getRandomInteger(0,TIMES_FRAME.length -1)],
    checkout:TIMES_FRAME[getRandomInteger(0,TIMES_FRAME.length -1)],
    features: getArraypush(FACILITIES),
    description: LIST_DESCRIPTION[getRandomInteger(0,LIST_DESCRIPTION.length-1)],
    photos: getArraypush(HOUSES_IMG),
  }

  return Object.assign({},locationXY,author,offer);
}
getAd();

let listAd = new Array(AD_LIST_NUMBER).fill(null).map(() => getAd());
alert(listAd);
