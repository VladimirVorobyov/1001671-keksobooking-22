import { resetForm, onFormSubmit } from './form-reset.js';
import { deleteSuccessBlockEsc, successBlock, deleteSuccessBlockClick, deleteErrorBlockEsc, errorBlock, onErrorButton,
  deleteErrorBlockClick, deleteErrorBlockButton } from './get-pop-up-server.js';

const mainBlock = document.querySelector('main');

onFormSubmit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then( () => {
      mainBlock.appendChild(successBlock)
      resetForm();
      document.addEventListener('keydown', deleteSuccessBlockEsc);
      document.addEventListener('click', deleteSuccessBlockClick);

    })
    .catch( () => {
      mainBlock.appendChild(errorBlock);
      document.addEventListener('keydown', deleteErrorBlockEsc);
      document.addEventListener('click', deleteErrorBlockClick);
      onErrorButton.addEventListener('click', deleteErrorBlockButton);
    });
});



