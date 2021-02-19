let typeHouse = document.querySelector('#type');
let priceHouse = document.querySelector('#price');
priceHouse.placeholder = 1000;
priceHouse.min = 1000;

let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', function(){
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
})

timeOut.addEventListener('change', function(){
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
})

typeHouse.addEventListener('change', function(){
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
})



