const PRICE_HOUSE = 5000;
const PRICE_FLAT = 1000;
const PRICE_BUNGALOW = 0;
const PRICE_PALACE = 10000;
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
  }else {
    titleForm.setCustomValidity('');
  }
};

const getCapacity = () => {
  rooms.forEach((fieldset)=>{
    fieldset.disabled = true;
  })
  if(capacity.value === '1'){
    rooms[0].disabled = false;
    rooms[1].disabled = false;
    rooms[2].disabled = false;
    roomNumber.value = '1';

  }else if(capacity.value === '0'){
    rooms[3].disabled = false;
    roomNumber.value = '100';
  }else if(capacity.value  === '3'){
    rooms[2].disabled = false;
    roomNumber.value = '3';

  }
  else if(capacity.value === '2'){
    rooms[2].disabled = false;
    rooms[1].disabled = false;
    roomNumber.value = '3';
  }
}

const getRoomNumber = ()=>{
  options.forEach((fieldset)=>{
    fieldset.disabled = true;
  })
  if(roomNumber.value === '1'){
    options[2].disabled = false;
    capacity.value = '1';
  }else if(roomNumber.value === '100'){
    options[3].disabled = false;
    capacity.value = '0';
  }else if(roomNumber.value === '3'){
    options[2].disabled = false;
    options[1].disabled = false;
    options[0].disabled = false;
    capacity.value = '1';
  }
  else if(roomNumber.value === '2'){
    options[2].disabled = false;
    options[1].disabled = false;
    capacity.value = '1';
  }
}
const getTimeIn = ()=>{
  switch(timeIn.value){
    case '12:00' :
      timeOut.value = '12:00';
      break;
    case '13:00' :
      timeOut.value = '13:00';
      break;
    case '14:00' :
      timeOut.value = '14:00';
      break;
  }
}

const getTimeOut = () => {
  switch(timeOut.value){
    case '12:00' :
      timeIn.value = '12:00';
      break;
    case '13:00' :
      timeIn.value = '13:00';
      break;
    case '14:00' :
      timeIn.value = '14:00';
      break;
  }
}

const getTypeHouse =  () => {
  switch(typeHouse.value){
    case 'house' :
      priceHouse.min = PRICE_HOUSE ;
      priceHouse.placeholder = PRICE_HOUSE ;
      break;
    case 'flat':
      priceHouse.placeholder = PRICE_FLAT;
      priceHouse.min = PRICE_FLAT;
      break;
    case 'bungalow':
      priceHouse.placeholder = PRICE_BUNGALOW;
      priceHouse.min = PRICE_BUNGALOW;
      break;
    case 'palace':
      priceHouse.placeholder = PRICE_PALACE;
      priceHouse.min = PRICE_PALACE;
      break;
  }
}

export { getTitleForm, getCapacity, getRoomNumber, getTimeIn, getTypeHouse, getTimeOut,
  titleForm,capacity,roomNumber,timeIn, timeOut,typeHouse, priceHouse}
