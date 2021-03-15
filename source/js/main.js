import { showAlert } from './util.js';
import { getAdds } from './get-adds.js';
import './get-adds.js';
import './form.js';
import'./cards.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const RERENDER_DELAY = 500;
const ANY_TYPE = 'any';
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingPrice = mapFilters.querySelector('#housing-price');
const filterConditioner = document.querySelector('#filter-conditioner');
const filterElevator = document.querySelector('#filter-elevator');
const filterWasher = document.querySelector('#filter-washer');
const filterParking = document.querySelector('#filter-parking');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterWifi = document.querySelector('#filter-wifi');
const housingFeatures = document.querySelector('#housing-features');
const featuresInputs = housingFeatures.querySelectorAll('input');
const wifi = featuresInputs[0];
const dishwasher = featuresInputs[1];
const parking = featuresInputs[2];
const washer = featuresInputs[3];
const elevator = featuresInputs[4];
const conditioner = featuresInputs[5];
let filteredOptions;
let options = [];
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


fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then( (response) => response.json() )
  .then( (cards) => {
    options = cards;
    getAdds( cards.slice(0,10) );
  } )
  .catch( () => {
    showAlert('Не удалось связаться с сервером. Попробуйте ещё раз');
  } );



const filterAndShow =  (facility) => {
  filteredOptions = options.slice();
  if (facility.type) {
    if (housingType.value !== ANY_TYPE) {
      filteredOptions = filteredOptions.filter((o) => o.offer.type === facility.type);
    }
  }

  if (facility.rooms) {
    if (housingRooms.value !== ANY_TYPE) {
      filteredOptions = filteredOptions.filter( (o) => o.offer.rooms === Number(facility.rooms) );
    }
  }

  if (facility.guests) {
    if (housingGuests.value !== ANY_TYPE) {
      filteredOptions = filteredOptions.filter( (o) => o.offer.guests === Number(facility.guests) );
    }
  }

  if(facility.price){
    if (housingPrice.value !== ANY_TYPE) {
      if ( housingPrice.value === 'middle') {
        filteredOptions = filteredOptions.filter( (o) => o.offer.price >= MIN_PRICE && o.offer.price <= MAX_PRICE );
      } else if (housingPrice.value === 'low') {
        filteredOptions = filteredOptions.filter( (o) => o.offer.price < MIN_PRICE );
      } else if (housingPrice.value === 'high') {
        filteredOptions = filteredOptions.filter( (o) => o.offer.price > MAX_PRICE );
      }
    }
  }

  const getFilterFeatures = (feature) => {
    if (feature) {
      filteredOptions = filteredOptions.filter( (o) => o.offer.features.includes(feature) === true );
    } else {
      filteredOptions = filteredOptions.filter( (o) => o.offer.features.includes(feature) === false );
    }
  }

  getFilterFeatures(facility.wifi);
  getFilterFeatures(facility.dishwasher);
  getFilterFeatures(facility.parking);
  getFilterFeatures(facility.washer);
  getFilterFeatures(facility.elevator);
  getFilterFeatures(facility.conditioner);
  const debouncePrint = _.debounce( () => getAdds( filteredOptions.slice(0,10) ),RERENDER_DELAY );
  debouncePrint();
}

housingType.addEventListener('change', () => {
  selection.type = housingType.value;
  filterAndShow(selection);
} )

housingRooms.addEventListener('change', () => {
  selection.rooms = housingRooms.value;
  filterAndShow(selection);
} )

housingGuests.addEventListener('change', () => {
  selection.guests = housingGuests.value;
  filterAndShow(selection);
} )

housingPrice.addEventListener('change', () => {
  selection.price = housingPrice.value;
  filterAndShow(selection);
} )

wifi.addEventListener('change', () => {

  if (!selection.wifi) {
    selection.wifi = filterWifi.value;
    filterAndShow(selection);
  } else {
    selection.wifi = null;
    filterAndShow(selection);
  }

} )

dishwasher.addEventListener('change', () => {

  if (!selection.dishwasher) {
    selection.dishwasher = filterDishwasher.value;
    filterAndShow(selection);
  } else {
    selection.dishwasher = null;
    filterAndShow(selection);
  }

} )

parking.addEventListener('change', () => {

  if (!selection.parking) {
    selection.parking = filterParking.value;
    filterAndShow(selection);
  } else {
    selection.parking = null;
    filterAndShow(selection);
  }

} )

washer.addEventListener('change', () => {

  if (!selection.washer) {
    selection.washer = filterWasher.value;
    filterAndShow(selection);
  } else {
    selection.washer = null;
    filterAndShow(selection);
  }

} )

elevator.addEventListener('change', () => {

  if (!selection.elevator) {
    selection.elevator = filterElevator.value;
    filterAndShow(selection);
  } else {
    selection.elevator = null;
    filterAndShow(selection);
  }

} )

conditioner.addEventListener('change', () => {

  if (!selection.conditioner) {
    selection.conditioner = filterConditioner.value;
    filterAndShow(selection);
  } else {
    selection.conditioner = null;
    filterAndShow(selection);
  }

} )
