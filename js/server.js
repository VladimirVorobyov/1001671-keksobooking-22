import { showAlert } from './util.js';
import { getAdds } from './marker.js';
import { marker } from './cards.js';

let address = document.querySelector('#address');
let adFormSubmit = document.querySelector('.ad-form');
let success = document.querySelector('#success').content.querySelector('.success');
let successBlock = success.cloneNode(true);
let blockMain = document.querySelector('main');

let options = [];

let adFormReset = document.querySelector('.ad-form__reset');

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

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((cards) => {
    options = cards;
    getAdds(cards.slice(0,10));

  })
  .catch(() => {
    showAlert('Не удалось связаться с сервером. Попробуйте ещё раз');
  });


adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  getReset();
})

export{options}

