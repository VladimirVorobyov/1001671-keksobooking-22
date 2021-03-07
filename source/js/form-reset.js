import { marker } from './cards.js';
import {previevImg,adformphoto} from './avatar.js'

let address = document.querySelector('#address');
let adFormSubmit = document.querySelector('.ad-form');
let adFormReset = document.querySelector('.ad-form__reset');

const getReset = function () {
  adFormSubmit.reset();
  address.value = '35.7, 139.8';
  previevImg.src= 'img/muffin-grey.svg';
  while ( adformphoto.firstChild) {
    adformphoto.removeChild( adformphoto.firstChild);
  }
  marker.setLatLng({
    lat: 35.7,
    lng: 139.8,
  });
}

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  getReset();
})

export {getReset}
