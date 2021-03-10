const TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const adFormHeadr = document.querySelector('.ad-form-header');
const fileChooser = adFormHeadr.querySelector('.ad-form-header__input');
const preview = adFormHeadr.querySelector('.ad-form-header__preview');
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

export { previewImg, adFormPhoto }
