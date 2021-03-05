let typeHouse = document.querySelector('#type');
let priceHouse = document.querySelector('#price');
let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');
let titleForm = document.querySelector('#title');
let roomNumber = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');
let rooms = roomNumber.querySelectorAll('option');
let options = capacity.querySelectorAll('option');

const getTitleForm = function (){
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

const getCapacity = function(){
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
const getRoomNumber = function(){
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
const getTimeIn = function(){
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

const getTimeOut = function(){
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

const getTypeHouse =  function(){
  switch(typeHouse.value){
    case 'house' :
      priceHouse.min = 5000;
      priceHouse.placeholder = 5000;
      break;
    case 'flat':
      priceHouse.placeholder = 1000;
      priceHouse.min = 1000;
      break;
    case 'bungalow':
      priceHouse.placeholder = 0;
      priceHouse.min = 0;
      break;
    case 'palace':
      priceHouse.placeholder = 10000;
      priceHouse.min = 10000;
      break;
  }
}

export { getTitleForm, getCapacity, getRoomNumber, getTimeIn, getTypeHouse, getTimeOut,
  titleForm,capacity,roomNumber,timeIn, timeOut,typeHouse, priceHouse}
