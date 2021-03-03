/* global _:readonly */
import { showAlert } from './util.js';
import { getAdds } from './evt.js';
import { marker } from './cards.js';

let address = document.querySelector('#address');
let adFormSubmit = document.querySelector('.ad-form');
let success = document.querySelector('#success').content.querySelector('.success');
let successBlock = success.cloneNode(true);
let blockMain = document.querySelector('main');


const getReset = function () {
  adFormSubmit.reset();
  address.value = '35.7, 139.8';
  marker.setLatLng({
    lat: 35.7,
    lng: 139.8,
  });
}


adFormSubmit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(() => {
      blockMain.appendChild(successBlock)
      getReset();
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          successBlock.remove();
        }
      });
      document.addEventListener('click', () => {
        successBlock.remove();
      });
    })
    .catch(() => {
      let error = document.querySelector('#error').content.querySelector('.error');
      let errorBlock = error.cloneNode(true)
      let errorButton = errorBlock.querySelector('.error__button');
      blockMain.appendChild(errorBlock);
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          errorBlock.remove();
        }
      });
      document.addEventListener('click', () => {
        errorBlock.remove();
      });
      errorButton.addEventListener('click', () => {
        errorBlock.remove();
      });

    });

});
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
let filteredOptions;
let housingType = document.querySelector('#housing-type');
fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((cards) => {
    options = cards;
    getAdds(cards.slice(0,10));

  })
  .catch(() => {
    showAlert('Не удалось связаться с сервером. Попробуйте ещё раз');
  });

let adFormReset = document.querySelector('.ad-form__reset');
adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  getReset();
})


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

let filterWifi = document.querySelector('#filter-wifi');
let housingFeatures = document.querySelector('#housing-features');
let featuresInputs = housingFeatures.querySelectorAll('input');


featuresInputs[0].addEventListener('change', ()=>{
  if(!selection.wifi){
    selection.wifi = filterWifi.value;
    filterAndShow();
  }else{
    selection.wifi = null;
    filterAndShow();
  }
})
let filterDishwasher = document.querySelector('#filter-dishwasher');
featuresInputs[1].addEventListener('change', ()=>{
  if(!selection.dishwasher){
    selection.dishwasher = filterDishwasher.value;
    filterAndShow();
  }else{
    selection.dishwasher = null;
    filterAndShow();
  }
})

let filterParking = document.querySelector('#filter-parking');
featuresInputs[2].addEventListener('change', ()=>{
  if(!selection.parking){
    selection.parking = filterParking.value;
    filterAndShow();
  }else{
    selection.parking = null;
    filterAndShow();
  }
})

let filterWasher = document.querySelector('#filter-washer');
featuresInputs[3].addEventListener('change', ()=>{
  if(!selection.washer){
    selection.washer = filterWasher.value;
    filterAndShow();
  }else{
    selection.washer = null;
    filterAndShow();
  }
})
let filterElevator = document.querySelector('#filter-elevator');
featuresInputs[4].addEventListener('change', ()=>{
  if(!selection.elevator){
    selection.elevator = filterElevator.value;
    filterAndShow();
  }else{
    selection.elevator = null;
    filterAndShow();
  }
})

let filterConditioner = document.querySelector('#filter-conditioner');
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
      filteredOptions = filteredOptions.filter((o) => o.offer.rooms == selection.rooms);
    }
  }

  if (selection.guests) {
    if (housingGuests.value !== 'any') {
      filteredOptions = filteredOptions.filter((o) => o.offer.guests == selection.guests)
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
  if(selection.wifi){
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.wifi) === true);
  }else{
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.wifi) === false);
  }

  if(selection.dishwasher){
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.dishwasher) === true);
  }else{
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.dishwasher) === false);
  }

  if(selection.parking){
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.parking) === true);
  }else{
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.parking) === false);
  }

  if(selection.washer){
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.washer) === true);
  }else{
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.washer) === false);
  }

  if(selection.elevator){
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.elevator) === true);
  }else{
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.elevator) === false);
  }

  if(selection.conditioner){
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.conditioner) === true);
  }else{
    filteredOptions = filteredOptions.filter((o) => o.offer.features.includes(selection.conditioner) === false);
  }
  const throttlePrint = _.debounce(()=>getAdds(filteredOptions.slice(0,10)),500);
  throttlePrint();
}


