import '../pages/index.css';
import {createCard, addPopupCard, popupImageOpen, popupAddCards} from './card';
import {popupProfile, openPopup, closePopup, editProfile} from "./modal";
import {formSelectors,enableValidation, checkEmptyFields} from './validate'
import {initialCards, popups, popupClose, buttonEditProfile, inputProfileName, inputProfileStatus, profileName, profileStatus, popupAddCardsClose, buttonAddPhotos, imagePopupClose, cardsList} from './constants';

editProfile();

addPopupCard();

// Добавление карточек на страницу
function addWebsiteCards () {
  initialCards.forEach((card) => {
    addCard(createCard(card.name, card.link));
  })
}

addWebsiteCards();

// Добавление карточки в контейнер
function addCard(card) {
  cardsList.prepend(card);
}

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

export {addCard};