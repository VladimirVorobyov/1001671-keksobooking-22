import { marker } from './cards.js';
const TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ESCAPE = 'Escape';
const ESC = 'Esc';
const roomPrices = {
  palace: 10000,
  flat: 1000,
  bungalow: 0,
  house: 5000,
};

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const capacityValues = {
  1 : [1, 2, 3],
  2 : [1,2],
  3 : [3],
  0 : [100],
};

const success = document.querySelector('#success').content.querySelector('.success');
const successBlock = success.cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const errorBlock = error.cloneNode(true)
const onErrorButton = errorBlock.querySelector('.error__button');
const address = document.querySelector('#address');
const adFormUser = document.querySelector('.ad-form');
const adFormReset = document.querySelector('.ad-form__reset');
const typeHouse = document.querySelector('#type');
const priceHouse = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const titleForm = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const rooms = roomNumber.querySelectorAll('option');
const options = capacity.querySelectorAll('option');
const mainBlock = document.querySelector('main');
const adFormHeader = document.querySelector('.ad-form-header');
const fileChooser = adFormHeader.querySelector('.ad-form-header__input');
const preview = adFormHeader.querySelector('.ad-form-header__preview');
const previewImg = preview.querySelector('img');
const fileImages = document.querySelector('#images');
const adFormPhoto = document.querySelector('.ad-form__photo');
const elementImg = document.createElement('img');

const addFileChooser = () => {
  const fileAvatar = fileChooser.files[0];
  const fileName = fileAvatar.name.toLowerCase();
  const matches = TYPES.some( (it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewImg.src = reader.result;
    });
    reader.readAsDataURL(fileAvatar);
  }

}

const addFileImages = () => {

  if(!adFormPhoto.childNodes.length){
    adFormPhoto.appendChild(elementImg);
  }

  const fileHouse = fileImages.files[0];
  const fileName = fileHouse.name.toLowerCase();
  const matches = TYPES.some( (it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      elementImg.src = reader.result;
    });
    reader.readAsDataURL(fileHouse);
  }

}

fileChooser.addEventListener('change', addFileChooser);
fileImages.addEventListener('change', addFileImages);

const deleteErrorBlockClick = () => {
  errorBlock.remove();
  document.removeEventListener('click', deleteErrorBlockClick);
}

const deleteErrorBlockButton = () => {
  errorBlock.remove();
  onErrorButton.removeEventListener('click', deleteErrorBlockButton);
}

const deleteSuccessBlockEsc = (evt) => {

  if (evt.key === ESCAPE || evt.key === ESC) {
    successBlock.remove();
    document.removeEventListener('keydown', deleteSuccessBlockEsc);
  }

}

const deleteSuccessBlockClick = () => {
  successBlock.remove();
  document.removeEventListener('click', deleteSuccessBlockClick);
}

const deleteErrorBlockEsc = (evt) => {

  if (evt.key === ESCAPE || evt.key === ESC) {
    errorBlock.remove();
    document.removeEventListener('keydown', deleteErrorBlockEsc);
  }

}

const resetForm = () =>  {
  adFormUser.reset();
  address.value = '35.7, 139.8';
  previewImg.src = 'img/muffin-grey.svg';

  while (adFormPhoto.firstChild) {
    adFormPhoto.removeChild( adFormPhoto.firstChild);
  }

  marker.setLatLng( {
    lat: 35.7,
    lng: 139.8,
  } );
};

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
} );

const getTitleForm = () => {

  if (titleForm.validity.tooShort) {
    titleForm .setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else if (titleForm.validity.tooLong) {
    titleForm.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (titleForm.validity.valueMissing) {
    titleForm.setCustomValidity('Обязательное поле');
  } else {
    titleForm.setCustomValidity('');
  }

};

const getCapacity = () => {
  rooms.forEach( (fieldset) => {
    fieldset.disabled = true;
  } );

  capacityValues[capacity.value].forEach( (capacityAmount) => {
    rooms.forEach( (fieldset) => {

      if (Number(fieldset.value) === capacityAmount) {
        fieldset.disabled = false;
        fieldset.selected = true;
      }

    } )
  } )
}

const getRoomNumber = () => {
  options.forEach( (fieldset) => {
    fieldset.disabled = true;
  } )

  roomValues[roomNumber.value].forEach( (roomAmount) => {
    options.forEach( (fieldset) => {

      if (Number(fieldset.value) === roomAmount) {
        fieldset.disabled = false;
        fieldset.selected = true;
      }

    } )
  } )

};

const getTypeHouse = () => {
  const keysType = Object.keys(roomPrices);

  for (let i = 0; i < keysType.length; i++) {

    if (typeHouse.value === keysType[i]) {
      priceHouse.min =  roomPrices[keysType[i]];
      priceHouse.placeholder = roomPrices[keysType[i]];
    }

  }

}

priceHouse.placeholder = 1000;
priceHouse.min = 1000;

titleForm.addEventListener('invalid', getTitleForm);
capacity.addEventListener('change', getCapacity);
roomNumber.addEventListener('change', getRoomNumber);
timeIn.addEventListener('change', (event) => {
  const timeInValue = event.target.value;
  timeOut.value = timeInValue;
} );
timeOut.addEventListener('change', (event) => {
  const timeOutValue = event.target.value;
  timeIn.value = timeOutValue;
} );
typeHouse.addEventListener('change', getTypeHouse);
adFormUser.addEventListener('submit', (evt) => {
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
      onErrorButton.addEventListener('click', deleteErrorBlockButton);
    } );
} );
