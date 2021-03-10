const ESCAPE = 'Escape';
const ESC = 'Esc';
const success = document.querySelector('#success').content.querySelector('.success');
const successBlock = success.cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const errorBlock = error.cloneNode(true)
const onErrorButton = errorBlock.querySelector('.error__button');

const deleteErrorBlockClick = () => {
  errorBlock.remove();
  document.removeEventListener('click', deleteErrorBlockClick);
}

const deleteErrorBlockButton = () => {
  errorBlock.remove();
  onErrorButton.removeEventListener('click', deleteErrorBlockButton);
}

const deleteSuccessBlockEsc = (evt) => {

  if (evt.key === ESCAPE || evt.key === ESC) {
    successBlock.remove();
    document.removeEventListener('keydown', deleteSuccessBlockEsc);
  }

}

const deleteSuccessBlockClick = () => {
  successBlock.remove();
  document.removeEventListener('click', deleteSuccessBlockClick);
}

const deleteErrorBlockEsc = (evt) => {

  if (evt.key === ESCAPE || evt.key === ESC) {
    errorBlock.remove();
    document.removeEventListener('keydown', deleteErrorBlockEsc);
  }

}

export {deleteSuccessBlockEsc, deleteSuccessBlockClick, deleteErrorBlockEsc,  successBlock, onErrorButton,
  deleteErrorBlockClick, deleteErrorBlockButton, errorBlock}
