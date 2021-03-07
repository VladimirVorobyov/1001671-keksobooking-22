import { getRandomType, getFeatures, getPhoto } from './util.js';
import { map } from './cards.js';
let cardTimplate = document.querySelector('#card').content.querySelector('.popup');

let layerGroup = window.L.layerGroup().addTo(map);
const getAdds = function (сards) {
  layerGroup.clearLayers();
  сards.forEach(({ location, offer, author }) => {
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

    popupTitle.textContent = offer.title;
    popupAddress.textContent = offer.address;
    popupPrice.textContent = offer.price + '₽/ночь';
    popupType.textContent = getRandomType(offer.type);
    popupCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + offer.checkin + ' выезд до ' + offer.checkout;
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    let featuresList = offer.features;
    getFeatures(featuresList, popupFeatures);
    popupDescription.textContent = offer.description;
    getPhoto(offer.photos, photosGenus, popupPhoto);
    photosGenus.children[0].remove();
    popupAvatar.src = author.avatar;

    const icon = window.L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = window.L.marker({
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon,
    },
    );

    marker.addTo(layerGroup).bindPopup(
      oneAd,
      {
        keepInView: true,
      },
    );
  });
}
export { getAdds };
