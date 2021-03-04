/* global _:readonly */
import { getAdds } from './evt.js';
import{ options } from './server.js';

let filterConditioner = document.querySelector('#filter-conditioner');
let filterElevator = document.querySelector('#filter-elevator');
let filterWasher = document.querySelector('#filter-washer');
let filterParking = document.querySelector('#filter-parking');
let filterDishwasher = document.querySelector('#filter-dishwasher');
let filterWifi = document.querySelector('#filter-wifi');
let housingFeatures = document.querySelector('#housing-features');
let featuresInputs = housingFeatures.querySelectorAll('input');
let selection = {
  type: null,
  price: null,
  rooms: null,
  guests: null,
  wifi: null,
  dishwasher: null,
  parking: null,
  washer: null,
  elevator: null,
  conditioner: null,
}
let filteredOptions;
let housingType = document.querySelector('#housing-type');
housingType.addEventListener('change', () => {
  selection.type = housingType.value;
  filterAndShow();
})
let housingRooms = document.querySelector('#housing-rooms');
housingRooms.addEventListener('change', () => {
  selection.rooms = housingRooms.value;
  filterAndShow();
})
let housingGuests = document.querySelector('#housing-guests');

housingGuests.addEventListener('change', () => {
  selection.guests = housingGuests.value;
  filterAndShow();

})
let housingPrice = document.querySelector('#housing-price');
housingPrice.addEventListener('change', () => {
  selection.price = housingPrice.value;
  filterAndShow();
})

featuresInputs[0].addEventListener('change', ()=>{
  if(!selection.wifi){
    selection.wifi = filterWifi.value;
    filterAndShow();
  }else{
    selection.wifi = null;
    filterAndShow();
  }
})

featuresInputs[1].addEventListener('change', ()=>{
  if(!selection.dishwasher){
    selection.dishwasher = filterDishwasher.value;
    filterAndShow();
  }else{
    selection.dishwasher = null;
    filterAndShow();
  }
})

featuresInputs[2].addEventListener('change', ()=>{
  if(!selection.parking){
    selection.parking = filterParking.value;
    filterAndShow();
  }else{
    selection.parking = null;
    filterAndShow();
  }
})

featuresInputs[3].addEventListener('change', ()=>{
  if(!selection.washer){
    selection.washer = filterWasher.value;
    filterAndShow();
  }else{
    selection.washer = null;
    filterAndShow();
  }
})

featuresInputs[4].addEventListener('change', ()=>{
  if(!selection.elevator){
    selection.elevator = filterElevator.value;
    filterAndShow();
  }else{
    selection.elevator = null;
    filterAndShow();
  }
})

featuresInputs[5].addEventListener('change', ()=>{
  if(!selection.conditioner){
    selection.conditioner = filterConditioner.value;
    filterAndShow();
  }else{
    selection.conditioner = null;
    filterAndShow();
  }
})

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
  const debouncePrint = _.debounce(()=>getAdds(filteredOptions.slice(0,10)),500);
  debouncePrint();
}
