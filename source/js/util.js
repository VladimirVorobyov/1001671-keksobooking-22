const ALERT_SHOW_TIME = 5000;
const FLAT = 'Квартира';
const BUNGALOW = 'Бунгало';
const HOUSE = 'Дом';
const PALACE = 'Дворец';

const getType = (type) => {
  switch(type) {
    case 'flat':
      return FLAT ;
    case 'bungalow':
      return BUNGALOW;
    case 'house':
      return HOUSE;
    case 'palace':
      return PALACE;
  }
}

const getFeatures = (lists,genus) => {
  const fragment = document.createDocumentFragment();

  for (let i =0; i<lists.length; i++) {

    if (lists.some( (wizard) => wizard === lists[i]) ) {
      let newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + lists[i]);
      fragment.appendChild(newElement);
    }

    genus.appendChild(fragment)
  }
}

const getPhoto = (lists,genus,popupPhoto) => {
  const fragment = document.createDocumentFragment();

  for (let i =0; i<lists.length; i++) {
    let photosImg = popupPhoto.cloneNode(true);
    photosImg.src = lists[i];
    fragment.appendChild(photosImg);
  }

  genus.appendChild(fragment)
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error__block')
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout( () => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export{ getType, getFeatures, getPhoto, showAlert}
