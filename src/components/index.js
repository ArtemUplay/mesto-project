import '../pages/index.css';
import {initialCards, createCard, addCard, addWebsiteCards, addPopupCard, popupImageOpen, popupAddCards} from './card';
import {popups, popupProfile, popupClose, openPopup, closePopup, editProfile, closeEscPopup, profileName, profileStatus, inputProfileName, inputProfileStatus} from "./modal";
import {formSelectors, showInputError, hideInputError, isValid, enableValidation, checkEmptyFields, hasInvalidInput, setEventListeners, toggleButtonState} from './validate'

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupAddCardsClose = document.querySelector('.popup__close_add-card');
const buttonAddPhotos = document.querySelector('.profile__add-button');
const imagePopupClose = document.querySelector('.popup__close_image-popup');

editProfile();

addPopupCard();

// Добавление карточек на страницу
addWebsiteCards();

// Валидация
enableValidation(formSelectors);

// Закрытие попапов кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
})

popupClose.addEventListener('click', function () {
  closePopup(popupProfile);
});

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile);
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