import{filterAndShow} from './change-facilities.js'
import{ housingType, housingRooms, housingGuests, housingPrice } from './change-facilities.js';

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
const wifi = featuresInputs[0];
const dishwasher = featuresInputs[1];
const parking = featuresInputs[2];
const washer = featuresInputs[3];
const elevator = featuresInputs[4];
const conditioner = featuresInputs[5];

housingType.addEventListener('change', () => {
  selection.type = housingType.value;
  filterAndShow(selection);
})

housingRooms.addEventListener('change', () => {
  selection.rooms = housingRooms.value;
  filterAndShow(selection);
})

housingGuests.addEventListener('change', () => {
  selection.guests = housingGuests.value;
  filterAndShow(selection);

})

housingPrice.addEventListener('change', () => {
  selection.price = housingPrice.value;
  filterAndShow(selection);
})

wifi.addEventListener('change', ()=>{
  if(!selection.wifi){
    selection.wifi = filterWifi.value;
    filterAndShow(selection);
  }else{
    selection.wifi = null;
    filterAndShow(selection);
  }
})

dishwasher.addEventListener('change', ()=>{
  if(!selection.dishwasher){
    selection.dishwasher = filterDishwasher.value;
    filterAndShow(selection);
  }else{
    selection.dishwasher = null;
    filterAndShow(selection);
  }
})

parking.addEventListener('change', ()=>{
  if(!selection.parking){
    selection.parking = filterParking.value;
    filterAndShow(selection);
  }else{
    selection.parking = null;
    filterAndShow(selection);
  }
})

washer.addEventListener('change', ()=>{
  if(!selection.washer){
    selection.washer = filterWasher.value;
    filterAndShow(selection);
  }else{
    selection.washer = null;
    filterAndShow(selection);
  }
})

elevator.addEventListener('change', ()=>{
  if(!selection.elevator){
    selection.elevator = filterElevator.value;
    filterAndShow(selection);
  }else{
    selection.elevator = null;
    filterAndShow(selection);
  }
})

conditioner.addEventListener('change', ()=>{
  if(!selection.conditioner){
    selection.conditioner = filterConditioner.value;
    filterAndShow(selection);
  }else{
    selection.conditioner = null;
    filterAndShow(selection);
  }
})