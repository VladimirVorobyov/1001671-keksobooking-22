import { marker } from './cards.js';
import { previewImg, adFormPhoto } from './avatar.js'


let address = document.querySelector('#address');
const onFormSubmit = document.querySelector('.ad-form');
let onFormReset = document.querySelector('.ad-form__reset');

const resetForm = () =>  {
  onFormSubmit.reset();
  address.value = '35.7, 139.8';
  previewImg.src= 'img/muffin-grey.svg';

  while ( adFormPhoto.firstChild) {
    adFormPhoto.removeChild( adFormPhoto.firstChild);
  }

  marker.setLatLng({
    lat: 35.7,
    lng: 139.8,
  });
}

onFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
})

export { resetForm, onFormSubmit }
