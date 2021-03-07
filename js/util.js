const ALERT_SHOW_TIME = 5000;

const getRandomType = (type) => {
  switch(type){
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

const getFeatures = (lists,genus) => {
  const fragment = document.createDocumentFragment();
  for(let i =0; i<lists.length; i++){
    if(lists.some((wizard) => wizard === lists[i])){
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
  for(let i =0; i<lists.length; i++){
    let photosImg = popupPhoto.cloneNode(true);
    photosImg.src = lists[i];
    fragment.appendChild(photosImg);
  }
  genus.appendChild(fragment)
}
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export{ getRandomType, getFeatures, getPhoto, showAlert}
