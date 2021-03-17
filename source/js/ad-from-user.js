const ESCAPE = 'Escape';
const ROUNDING_COORDINATES = 5;
const START_COORD_LAT = 35.7;
const START_COORD_LNG = 139.8;
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
const mapFiltersOptions = mapFilters.querySelectorAll('select');
const housingFeatures = mapFilters.querySelector('#housing-features');
const featuresInputs = housingFeatures.querySelectorAll('input');


adForm.classList.add('ad-form--disabled');
mapFiltersOptions.forEach((select) => select.disabled = true);
featuresInputs.forEach((input) => input.disabled = true);
fieldsets.forEach((fieldset) => {
  fieldset.disabled = true;
});
address.value = START_COORD_LAT + ', ' + START_COORD_LNG;
const map = L.map('map-canvas')
  .on('load', () => {
    mapFiltersOptions.forEach((select) => select.disabled = false);
    featuresInputs.forEach((input) => input.disabled = false);
    adForm.classList.remove('ad-form--disabled');
    fieldsets.forEach( (fieldset) => {
      fieldset.disabled = false;
    })
  })
  .setView( {
    lat: START_COORD_LAT,
    lng: START_COORD_LNG,
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
    lat: START_COORD_LAT,
    lng: START_COORD_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);


marker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(ROUNDING_COORDINATES)},${evt.target.getLatLng().lng.toFixed(ROUNDING_COORDINATES)}`
});

const resetForm = () => {
  adFromUser.reset();
  address.value = START_COORD_LAT + ', ' + START_COORD_LNG;
  previewImg.src = 'img/muffin-grey.svg';

  while (adFormPhoto.firstChild) {
    adFormPhoto.removeChild( adFormPhoto.firstChild);
  }

  marker.setLatLng( {
    lat: START_COORD_LAT,
    lng: START_COORD_LNG,
  } );
};

const deleteErrorBlock = () => {
  errorBlock.remove();
  document.removeEventListener('click', deleteErrorBlockClick);
  errorButton.removeEventListener('click', deleteErrorBlockButton);
  document.removeEventListener('keydown', deleteErrorBlockEsc);

}

const deleteErrorBlockEsc = (evt) => {

  if (evt.key === ESCAPE) {
    deleteErrorBlock();
  }

}


const deleteErrorBlockClick = () => {
  deleteErrorBlock();
}

const deleteErrorBlockButton = () => {
  deleteErrorBlock();
}

const deleteSuccessBlock = () =>{
  successBlock.remove();
  document.removeEventListener('keydown', deleteSuccessBlockEsc);
  document.removeEventListener('click', deleteSuccessBlockClick);
}

const deleteSuccessBlockEsc = (evt) => {

  if (evt.key === ESCAPE) {
    deleteSuccessBlock();
  }

}

const deleteSuccessBlockClick = () => {
  deleteSuccessBlock();
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
