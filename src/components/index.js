import '../pages/index.css';

const popups = document.querySelectorAll('.popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const inputProfileName = document.querySelector('.form__item_el_user-name');
const inputProfileNameError = document.querySelector(`${inputProfileName.id}-error`);
const inputProfileStatus = document.querySelector('.form__item_el_user-status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupAddCardsClose = document.querySelector('.popup__close_add-card');
const buttonSaveProfile = popup.querySelector('.form__button_edit');
const buttonAddPhotos = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_add-card');
const buttonSaveCards = document.querySelector('.form__button_add-card');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupImageOpen = document.querySelector('.image-popup');
const imagePopupClose = document.querySelector('.popup__close_image-popup');
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

function createCard(placeName, placeLink) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.cards__remove');
  const buttonLike = cardElement.querySelector('.cards__button-like');
  const cardImage = cardElement.querySelector('.cards__image');
  const imagePopupPicture = document.querySelector('.image-popup__picture');
  const pictureName = document.querySelector('.cards__name');
  const captionText = document.querySelector('.image-popup__caption');

  cardElement.querySelector('.cards__image').src = placeLink;
  cardElement.querySelector('.cards__image').alt = placeName;
  cardElement.querySelector('.cards__name').textContent = placeName;

  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_active');
  })

  cardRemoveButton.addEventListener('click', function () {
    cardElement.remove();
  })

  cardImage.addEventListener('click', function (evt) {
    openPopup(popupImageOpen);

    imagePopupPicture.src = evt.target.src;
    captionText.textContent = pictureName.textContent;
  })

  return cardElement;
}

function addCard(card) {
  cardsList.prepend(card);
}

function addWebsiteCards() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(createCard(initialCards[i].name, initialCards[i].link));
  }
}

addWebsiteCards();

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
})

// Открытие попапа
function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
};

// Закрытие попапа
function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
};

function editProfile() {
  const formEdit = document.querySelector('.form_edit');

  // Отменяем стандартную отправку формы
  formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileStatus.textContent = inputProfileStatus.value;
    closePopup(popup);
  })
};

editProfile();

// Создание карточек через попап
function addPopupCard() {
  const cardsForm = document.querySelector('.form_add-card');
  const placeName = document.querySelector('.form__item_el_name_place');
  const placeLink = document.querySelector('.form__item_el_photo-link');

  // Отменяем стандартную отправку формы
  cardsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCard(createCard(placeName.value, placeLink.value));
    closePopup(popupAddCards);
  })

  cardsForm.reset();
}

addPopupCard();

popupClose.addEventListener('click', function () {
  closePopup(popup);
});

buttonEditProfile.addEventListener('click', function () {
  openPopup(popup);
  const formElement = document.querySelector('.form_edit');
  const inputList = formElement.querySelectorAll('.form__item');

  inputList.forEach((inputElement) => {
    checkEmptyFields(formElement, inputElement);
  })
  inputProfileName.value = profileName.textContent;
  inputProfileStatus.value = profileStatus.textContent;
});

buttonAddPhotos.addEventListener('click', function () {
  openPopup(popupAddCards);
});

popupAddCardsClose.addEventListener('click', function () {
  closePopup(popupAddCards);
});

imagePopupClose.addEventListener('click', function () {
  closePopup(popupImageOpen);
});

// window.addEventListener('keydown', function (evt) {
//   popups.forEach((popup) => {
//     if (evt.code === "Escape" && popup.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//   })
// });

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  inputElement.classList.add('form__item_type_error');
  errorElement.classList.add('form__item-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = '';
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
}

function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement);
      isValid(formElement, inputElement);
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__button_disabled');
  }
}

function checkEmptyFields(formElement, inputElement) {
  if (inputElement.value == '') {
    hideInputError(formElement, inputElement);
  }
}

enableValidation();