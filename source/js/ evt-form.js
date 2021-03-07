import{getTitleForm, getCapacity, getRoomNumber, getTimeIn,
  getTypeHouse , getTimeOut, titleForm,capacity,roomNumber,timeIn, timeOut,typeHouse, priceHouse } from './form.js'

priceHouse.placeholder = 1000;
priceHouse.min = 1000;

titleForm.addEventListener('invalid', getTitleForm);
capacity.addEventListener('change', getCapacity);
roomNumber.addEventListener('change', getRoomNumber);
timeIn.addEventListener('change', getTimeIn );
timeOut.addEventListener('change', getTimeOut);
typeHouse.addEventListener('change', getTypeHouse);


