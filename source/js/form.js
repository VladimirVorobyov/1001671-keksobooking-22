const periods = ['12:00', '13:00', '14:00'];
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
}

const typeHouse = document.querySelector('#type');
const priceHouse = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const titleForm = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const rooms = roomNumber.querySelectorAll('option');
const options = capacity.querySelectorAll('option');

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
  })

  capacityValues[capacity.value].forEach( (capasityAmmount) => {
    rooms.forEach( (fieldset) => {

      if (Number(fieldset.value) === capasityAmmount) {
        fieldset.disabled = false;
        fieldset.selected = true;
      }

    })
  })
}

const getRoomNumber = () => {
  options.forEach( (fieldset) => {
    fieldset.disabled = true;
  })

  roomValues[roomNumber.value].forEach( (roomAmmount) => {
    options.forEach( (fieldset) => {

      if (Number(fieldset.value) === roomAmmount) {
        fieldset.disabled = false;
        fieldset.selected = true;
      }

    })
  })


}

const getTimeIn = () => {

  for (let i = 0; i < periods.length; i++) {

    if (timeIn.value === periods[i]) {
      timeOut.value = periods[i];
    }

  }

}

const getTimeOut = () => {

  for (let i = 0; i < periods.length; i++) {

    if(timeOut.value === periods[i]){
      timeIn.value = periods[i]
    }

  }

}

const getTypeHouse = () => {
  const keysType = Object.keys(roomPrices);

  for (let i = 0; i < keysType.length; i++) {

    if (typeHouse.value === keysType[i]) {
      priceHouse.min =  roomPrices[keysType[i]];
      priceHouse.placeholder = roomPrices[keysType[i]];
    }

  }

}


export { getTitleForm, getCapacity, getRoomNumber, getTimeIn, getTypeHouse, getTimeOut,
  titleForm, capacity, roomNumber, timeIn, timeOut, typeHouse, priceHouse }
