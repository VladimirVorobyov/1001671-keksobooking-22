const ESCAPE = 'Escape';
const startCoord = {
  lat: 35.7,
  lng: 139.8,
};
const success = document.querySelector('#success').content.querySelector('.success');
const successBlock = success.cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const errorBlock = error.cloneNode(true);
const errorButton = errorBlock.querySelector('.error__button');
const adFromUser = document.querySelector('.ad-form');
const adFormReset = document.querySelector('.ad-form__reset');
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');
const adFormHeader = document.querySelector('.ad-form-header');
const preview = adFormHeader.querySelector('.ad-form-header__preview');
const previewImg = preview.querySelector('img');
const adFormPhoto = document.querySelector('.ad-form__photo');
const mainBlock = document.querySelector('main');

adForm.classList.add('ad-form--disabled');
mapFilters.disabled = true;
fieldsets.forEach((fieldset)=>{
  fieldset.disabled = true;
});
address.value = startCoord.lat + ', ' + startCoord.lng;
const map = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.disabled = false;
    fieldsets.forEach( (fieldset) => {
      fieldset.disabled = false;
    })
  })
  .setView( {
    lat: startCoord.lat,
    lng: startCoord.lng,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

let mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const marker = L.marker(
  {
    lat: startCoord.lat,
    lng: startCoord.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);


marker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat},${evt.target.getLatLng().lng}`
});

const resetForm = () => {
  adFromUser.reset();
  address.value = startCoord.lat + ', ' + startCoord.lng;
  previewImg.src = 'img/muffin-grey.svg';

  while (adFormPhoto.firstChild) {
    adFormPhoto.removeChild( adFormPhoto.firstChild);
  }

  marker.setLatLng( {
    lat: startCoord.lat,
    lng: startCoord.lng,
  } );
};
const deleteErrorBlockClick = () => {
  errorBlock.remove();
  document.removeEventListener('click', deleteErrorBlockClick);
}

const deleteErrorBlockButton = () => {
  errorBlock.remove();
  errorButton.removeEventListener('click', deleteErrorBlockButton);
}

const deleteSuccessBlockEsc = (evt) => {

  if (evt.key === ESCAPE) {
    successBlock.remove();
    document.removeEventListener('keydown', deleteSuccessBlockEsc);
  }

}

const deleteSuccessBlockClick = () => {
  successBlock.remove();
  document.removeEventListener('click', deleteSuccessBlockClick);
}

const deleteErrorBlockEsc = (evt) => {

  if (evt.key === ESCAPE) {
    errorBlock.remove();
    document.removeEventListener('keydown', deleteErrorBlockEsc);
  }

}

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
} );


adFromUser.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch (
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then( () => {
      mainBlock.appendChild(successBlock)
      resetForm();
      document.addEventListener('keydown', deleteSuccessBlockEsc);
      document.addEventListener('click', deleteSuccessBlockClick);

    } )
    .catch( () => {
      mainBlock.appendChild(errorBlock);
      document.addEventListener('keydown', deleteErrorBlockEsc);
      document.addEventListener('click', deleteErrorBlockClick);
      errorButton.addEventListener('click', deleteErrorBlockButton);
    } );
} );

export{ map }
