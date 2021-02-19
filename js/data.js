import {getRandomInteger,getRandomBuking, getArraypush} from './util.js';
const AD_LIST_NUMBER = 10;
const TYPE_HOUSES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES_FRAME = ['12:00', '13:00', '14:00'];
const FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOUSES_IMG = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TITLES_DESCRIPTION =['квартира-life','дом-super', 'общага-like', 'хостел-max', 'дворец-guets'];
const LIST_DESCRIPTION = ['зато всегда очень чисто','у нас очень круто и молодежно','для большой компании',
  'увидишь когда заедешь'];

const getAd = function (){
  const locationXY = {
    x:getRandomBuking(35.65000,35.70000,5),
    y:getRandomBuking(139.70000,139.80000,5),
  }
  const author={
    avatar:'img/avatars/user0' + getRandomInteger(1,8)+'.png',
  }
  const offer = {
    title:TITLES_DESCRIPTION[getRandomInteger(0,TITLES_DESCRIPTION.length)],
    address: `${locationXY.x},${locationXY.y}`,
    price: getRandomInteger(1000,8000),
    type: TYPE_HOUSES[getRandomInteger(0,TYPE_HOUSES.length)],
    rooms: getRandomInteger(1,8),
    guests: getRandomInteger(1,8),
    checkin: TIMES_FRAME[getRandomInteger(0,TIMES_FRAME.length )],
    checkout:TIMES_FRAME[getRandomInteger(0,TIMES_FRAME.length)],
    features: getArraypush(FACILITIES),
    description: LIST_DESCRIPTION[getRandomInteger(0,LIST_DESCRIPTION.length)],
    photos: getArraypush(HOUSES_IMG),
  }

  return Object.assign({},locationXY,author,offer);
}


const listAd = ()=> new Array(AD_LIST_NUMBER).fill(null).map(() => getAd());
export{listAd}

