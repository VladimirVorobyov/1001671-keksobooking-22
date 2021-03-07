/* global _:readonly */
import { getAdds } from './marker.js';
import{ getOptions } from './main.js';

const housingType = document.querySelector('#housing-type');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingPrice = document.querySelector('#housing-price');
let filteredOptions;
const RERENDER_DELAY = 500;

const filterAndShow = function (facility) {
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
        filteredOptions = filteredOptions.filter((o) => o.offer.price > 10000 && o.offer.price <= 50000 );
      }else if(housingPrice.value === 'low'){
        filteredOptions = filteredOptions.filter((o) => o.offer.price < 10000 );
      }else if(housingPrice.value === 'high'){
        filteredOptions = filteredOptions.filter((o) => o.offer.price > 50000 );
      }
    }
  }
  const getFilterFeatures = function(featur){
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
  const debouncePrint = _.debounce(()=>getAdds(filteredOptions.slice(0,10)),RERENDER_DELAY);
  debouncePrint();
}

export{filterAndShow, housingType, housingRooms, housingGuests, housingPrice}
