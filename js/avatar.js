const TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.ad-form-header__input');
const preview = document.querySelector('.ad-form-header__preview');
const previevImg = preview.querySelector('img');
const fileOptions = document.querySelector('#images');
const adFormPhoto = document.querySelector('.ad-form__photo');

fileChooser.addEventListener('change', () => {
  const fileAvatar = fileChooser.files[0];
  const fileName = fileAvatar.name.toLowerCase();
  const matches = TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previevImg.src = reader.result;
    });
    reader.readAsDataURL(fileAvatar);
  }
});

fileOptions.addEventListener('change', () => {
  const fileHouse = fileOptions.files[0];
  const fileName = fileHouse.name.toLowerCase();
  const matches = TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const elementImg = document.createElement('img');
      elementImg.src = reader.result;
      adFormPhoto.appendChild(elementImg);
    });
    reader.readAsDataURL(fileHouse);
  }
});

export {previevImg,adFormPhoto}
