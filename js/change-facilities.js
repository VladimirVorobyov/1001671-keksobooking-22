/* global _:readonly */
import { getAdds } from './marker.js';
import{ options } from './main.js';
import{ selection } from './change-form.js'

let housingType = document.querySelector('#housing-type');
let housingRooms = document.querySelector('#housing-rooms');
let housingGuests = document.querySelector('#housing-guests');
let housingPrice = document.querySelector('#housing-price');
let filteredOptions;
const RERENDER_DELAY = 500;

const filterAndShow = function () {
  filteredOptions = options.slice();
  if (selection.type) {
    if (housingType.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.type === selection.type);
    }
  }

  if (selection.rooms) {
    if (housingRooms.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.rooms === Number(selection.rooms));
    }
  }

  if (selection.guests) {
    if (housingGuests.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.guests === Number(selection.guests));
    }
  }

  if(selection.price){
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
  getFilterFeatures(selection.wifi);
  getFilterFeatures(selection.dishwasher);
  getFilterFeatures(selection.parking);
  getFilterFeatures(selection.washer);
  getFilterFeatures(selection.elevator);
  getFilterFeatures(selection.conditioner);
  const debouncePrint = _.debounce(()=>getAdds(filteredOptions.slice(0,10)),RERENDER_DELAY);
  debouncePrint();
}

export{filterAndShow, housingType, housingRooms, housingGuests, housingPrice}
