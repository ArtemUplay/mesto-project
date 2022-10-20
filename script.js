const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupAddCardsClose = document.querySelector('.popup__close_add-card');
const saveButton = popup.querySelector('.form__button');
const addButton = document.querySelector('.profile__add-button');
const addCardsPopup = document.querySelector('.popup_add-card');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

addButton.addEventListener('click', function () {
  addCardsPopup.classList.add('popup_opened');
})

popupAddCardsClose.addEventListener('click', function () {
  addCardsPopup.classList.remove('popup_opened');
})

function editProfile() {
  const form = document.querySelector('.form');
  const inputProfileName = document.querySelector('.form__item_el_user-name');
  const inputProfileStatus = document.querySelector('.form__item_el_user-status');
  const profileName = document.querySelector('.profile__name');
  const profileStatus = document.querySelector('.profile__status');

  // Отменяем стандартную отправку формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  saveButton.addEventListener('click', function () {
    profileName.textContent = inputProfileName.value;
    profileStatus.textContent = inputProfileStatus.value;
    popup.classList.remove('popup_opened');
  })
}

editProfile();




