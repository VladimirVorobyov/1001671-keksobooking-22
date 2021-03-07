import { marker } from './cards.js';
import {previevImg,adFormPhoto} from './avatar.js'

let address = document.querySelector('#address');
let adFormSubmit = document.querySelector('.ad-form');
let adFormReset = document.querySelector('.ad-form__reset');

const getReset = () =>  {
  adFormSubmit.reset();
  address.value = '35.7, 139.8';
  previevImg.src= 'img/muffin-grey.svg';
  while ( adFormPhoto.firstChild) {
    adFormPhoto.removeChild( adFormPhoto.firstChild);
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
