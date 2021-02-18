import {listAd} from './data.js';
import {getRandomType, getFeatures, getPhoto} from './util.js';
let cardTimplate = document.querySelector('#card').content.querySelector('.popup');
let mapCanvas = document.querySelector('#map-canvas');
//let multipleAds = mapCanvas.children;
let adCards = listAd();





adCards.forEach((element) => {
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

  popupTitle.textContent = element.title;
  popupAddress.textContent = element.address;
  popupPrice.textContent = element.price + '₽/ночь';
  popupType.textContent= getRandomType(element.type);
  popupCapacity.textContent =  element.rooms + ' комнаты для ' + element.guests + ' гостей';
  popupTime.textContent = 'Заезд после '+ element.checkin + ' выезд до ' + element.checkout;
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  let featuresList = element.features;
  getFeatures(featuresList,popupFeatures);
  popupDescription.textContent = element.description;
  getPhoto(element.photos, photosGenus, popupPhoto);
  photosGenus.children[0].remove();
  popupAvatar.src = element.avatar;
  mapCanvas.append(oneAd);
});

