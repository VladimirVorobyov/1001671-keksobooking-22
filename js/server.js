import {getReset } from './form-reset.js';

const adFormSubmit = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success');
const successBlock = success.cloneNode(true);
const blockMain = document.querySelector('main');
const error = document.querySelector('#error').content.querySelector('.error');
const errorBlock = error.cloneNode(true)
const errorButton = errorBlock.querySelector('.error__button');


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
      const getYes= (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          successBlock.remove();
        }
        document.removeEventListener('keydown', getYes);
      }
      const getYesClick = () => {
        successBlock.remove();
        document.removeEventListener('click', getYesClick);
      }
      blockMain.appendChild(successBlock)
      getReset();
      document.addEventListener('keydown', getYes);
      document.addEventListener('click', getYesClick);
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



