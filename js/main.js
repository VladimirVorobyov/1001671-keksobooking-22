import { showAlert } from './util.js';
import { getAdds } from './get-adds.js';
import './get-adds.js';
import './form.js';
import'./cards.js';
import'./on-form-submit.js';
import'./change-form.js';
import'./avatar.js';
import './form-reset.js';
import './ evt-form.js';
import'./get-pop-up-server.js';

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

const getDataServer = () => options;
export{getDataServer}
