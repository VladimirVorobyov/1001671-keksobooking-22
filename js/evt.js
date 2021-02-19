import {listAd} from './data.js';
import {getRandomType, getFeatures, getPhoto} from './util.js';
let cardTimplate = document.querySelector('#card').content.querySelector('.popup');
let mapCanvas = document.querySelector('#map-canvas');
let adCards = listAd();

const fragment = document.createDocumentFragment();
adCards.forEach(({title,address,price,type,rooms,guests,checkin,checkout,features,description,photos,avatar}) => {
  let oneAd = cardTimplate.cloneNode(true);
  let popupTitle = oneAd.querySelector('.popup__title');
  let popupAddress = oneAd.querySelector('.popup__text--address');
  let popupPrice = oneAd.querySelector('.popup__text--price');
  let popupType = oneAd.querySelector('.popup__type');
  let popupCapacity = oneAd.querySelector('.popup__text--capacity');
  let popupTime = oneAd.querySelector('.popup__text--time');
  let popupFeatures = oneAd.querySelector('.popup__features');
  let popupDescription = oneAd.querySelector('.popup__description');
  let popupPhoto = oneAd.querySelector('.popup__photo');
  let photosGenus = oneAd.querySelector('.popup__photos');
  let popupAvatar = oneAd.querySelector('.popup__avatar');

  popupTitle.textContent = title;
  popupAddress.textContent = address;
  popupPrice.textContent = price + '₽/ночь';
  popupType.textContent= getRandomType(type);
  popupCapacity.textContent =  rooms + ' комнаты для ' + guests + ' гостей';
  checkin=checkout;
  popupTime.textContent = 'Заезд после '+ checkin + ' выезд до ' + checkout;
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  let featuresList = features;
  getFeatures(featuresList,popupFeatures);
  popupDescription.textContent = description;
  getPhoto(photos, photosGenus, popupPhoto);
  photosGenus.children[0].remove();
  popupAvatar.src = avatar;
  fragment.appendChild(oneAd);
});

mapCanvas.append(fragment.firstElementChild);
