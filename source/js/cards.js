/* global L:readonly */

let adForm = document.querySelector('.ad-form');
let fieldsets = adForm.querySelectorAll('fieldset');
let mapFilters = document.querySelector('.map__filters');
let address = document.querySelector('#address');
adForm.classList.add('ad-form--disabled');
mapFilters.disabled = true;
fieldsets.forEach((fieldset)=>{
  fieldset.disabled = true;
})

address.value= '35.7, 139.8';
const map = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.disabled = false;
    fieldsets.forEach((fieldset)=>{
      fieldset.disabled = false;
    })
  })
  .setView({
    lat: 35.68,
    lng: 139.75,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

let mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.7,
    lng: 139.8,
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

export{map,marker}
