import { showAlert } from './util.js';
import { getAdds } from './marker.js';
import './marker.js';
import './form.js';
import'./cards.js';
import'./server.js';
import'./change-form.js';
import'./avatar.js';
import './form-reset.js';
import './ evt-form.js';

let options = [];

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((cards) => {
    options = cards;
    getAdds(cards.slice(0,10));

  })
  .catch(() => {
    showAlert('Не удалось связаться с сервером. Попробуйте ещё раз');
  });

const getOptions = () => options;
export{getOptions}
