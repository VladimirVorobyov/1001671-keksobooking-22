import { getType, getFeatures, getPhoto } from './util.js';
import { map } from './ad-from-user.js';

let cardTemplate = document.querySelector('#card').content.querySelector('.popup');
let layerGroup = L.layerGroup().addTo(map);

const getAdds = (cards) => {
  layerGroup.clearLayers();
  cards.forEach( ( { location, offer, author } ) => {
    const oneAd = cardTemplate.cloneNode(true);
    const popupTitle = oneAd.querySelector('.popup__title');
    const popupAddress = oneAd.querySelector('.popup__text--address');
    const popupPrice = oneAd.querySelector('.popup__text--price');
    const popupType = oneAd.querySelector('.popup__type');
    const popupCapacity = oneAd.querySelector('.popup__text--capacity');
    const popupTime = oneAd.querySelector('.popup__text--time');
    const popupFeatures = oneAd.querySelector('.popup__features');
    const popupDescription = oneAd.querySelector('.popup__description');
    const popupPhoto = oneAd.querySelector('.popup__photo');
    const photosGenus = oneAd.querySelector('.popup__photos');
    const popupAvatar = oneAd.querySelector('.popup__avatar');

    popupTitle.textContent = offer.title;
    popupAddress.textContent = offer.address;
    popupPrice.textContent = offer.price + '₽/ночь';
    popupType.textContent = getType(offer.type);
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

    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker( {
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
