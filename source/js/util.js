const ALERT_SHOW_TIME = 5000;

const getRandomInteger = function(min,max){
  if(min>=0 && max>=0 && min<max){
    return Math.floor(Math.random()*(max - min) + min);
  }
  return alert('не глупи');
};
const getRandomBuking = function( min, max, range){
  if(min>=0 && max>=0 && min<max){
    return (Math.random() * (max - min) + min).toFixed(range);
  }
  return alert('не глупи');
}

const getArraypush = function(array){
  let list =[];
  for(let i=0; i<getRandomInteger(0,array.length); i++){
    let stance = array[getRandomInteger(0,array.length)]
    if(list.indexOf(stance) === -1){
      list.push(stance)
    }
  }
  return list;
}
const getRandomType = function(type){
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

const getFeatures = function(list,genus){
  const fragment = document.createDocumentFragment();
  for(let i =0; i<list.length; i++){
    if(list.some((wizard) => wizard === list[i])){
      let newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + list[i]);
      fragment.appendChild(newElement);
    }
    genus.appendChild(fragment)
  }

}
const getPhoto = function(list,genus,popupPhoto){
  const fragment = document.createDocumentFragment();
  for(let i =0; i<list.length; i++){
    let photosImg = popupPhoto.cloneNode(true);
    photosImg.src = list[i];
    fragment.appendChild(photosImg);
  }
  genus.appendChild(fragment)
}
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
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

export{getRandomInteger,getRandomBuking, getArraypush, getRandomType, getFeatures, getPhoto, showAlert}
