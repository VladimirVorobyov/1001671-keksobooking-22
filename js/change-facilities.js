import { getAdds } from './marker.js';
import{ getOptions } from './main.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const RERENDER_DELAY = 500;
const housingType = document.querySelector('#housing-type');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingPrice = document.querySelector('#housing-price');
let filteredOptions;

const filterAndShow =  (facility) => {
  filteredOptions = getOptions().slice();
  if (facility.type) {
    if (housingType.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.type === facility.type);
    }
  }

  if (facility.rooms) {
    if (housingRooms.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.rooms === Number(facility.rooms));
    }
  }

  if (facility.guests) {
    if (housingGuests.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.guests === Number(facility.guests));
    }
  }

  if(facility.price){
    if (housingPrice.value !== 'any') {
      if(housingPrice.value === 'middle'){
        filteredOptions = filteredOptions.filter((o) => o.offer.price >= MIN_PRICE && o.offer.price <= MAX_PRICE );
      }else if(housingPrice.value === 'low'){
        filteredOptions = filteredOptions.filter((o) => o.offer.price < MIN_PRICE );
      }else if(housingPrice.value === 'high'){
        filteredOptions = filteredOptions.filter((o) => o.offer.price > MAX_PRICE);
      }
    }
  }
  const getFilterFeatures = (featur) => {
    if(featur){
      filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(featur) === true);
    }else{
      filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(featur) === false);
    }
  }
  getFilterFeatures(facility.wifi);
  getFilterFeatures(facility.dishwasher);
  getFilterFeatures(facility.parking);
  getFilterFeatures(facility.washer);
  getFilterFeatures(facility.elevator);
  getFilterFeatures(facility.conditioner);
  const debouncePrint = window._.debounce(()=>getAdds(filteredOptions.slice(0,10)),RERENDER_DELAY);
  debouncePrint();
}

export{filterAndShow, housingType, housingRooms, housingGuests, housingPrice}
