import {getReset } from './form-reset.js';

let adFormSubmit = document.querySelector('.ad-form');
let success = document.querySelector('#success').content.querySelector('.success');
let successBlock = success.cloneNode(true);
let blockMain = document.querySelector('main');
let error = document.querySelector('#error').content.querySelector('.error');
let errorBlock = error.cloneNode(true)
let errorButton = errorBlock.querySelector('.error__button');


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



