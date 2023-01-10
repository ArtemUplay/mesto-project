import '../pages/index.css';

import {
  createCard,
  addPopupCard,
  popupImageOpen,
  popupAddCards
} from './card';

import {
  popupProfile,
  openPopup,
  closePopup,
  editProfile,
  editAvatarProfile
} from "./modal";

import {
  formSelectors,
  enableValidation,
  checkEmptyFields
} from './validate';

import {
  fillProfile,
  loadWebsiteCards
} from './api';

import {
  popups,
  popupEditClose,
  buttonEditProfile,
  inputProfileName,
  inputProfileStatus,
  profileName,
  profileStatus,
  popupAddCardsClose,
  buttonAddPhotos,
  imagePopupClose,
  cardsList,
  avatarEditButton,
  popupEditAvatar,
  popupEditAvatarClose,
  avatarImage
} from './constants';

editProfile();

editAvatarProfile();

addPopupCard();

// Добавление карточек на страницу
function addWebsiteCards(cards) {
  console.log(cards);
  cards.forEach((card) => {
    addCard(createCard(card.name, card.link, card.likes, card.owner._id, card._id));
  })
}

// Загрузка карточек на страницу
loadWebsiteCards()
  .then(cards => {
    addWebsiteCards(cards.reverse());
  })

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

// Заполнение имени профиля и профессии
fillProfile(profileName, profileStatus, avatarImage)
  .then(profileInfo => {
    avatarImage.src = profileInfo.avatar;
    profileName.textContent = profileInfo.name;
    profileStatus.textContent = profileInfo.about;
  })

// Функция смены текста в кнопке в попапе при загрузке
function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = 'Сохранение...';
  } else {
    formButton.textContent = 'Сохранить';
  }
}

avatarEditButton.addEventListener('click', function () {
  openPopup(popupEditAvatar);
})

popupEditClose.addEventListener('click', function () {
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

popupEditAvatarClose.addEventListener('click', function () {
  closePopup(popupEditAvatar);
})

buttonAddPhotos.addEventListener('click', function () {
  openPopup(popupAddCards);
});

popupAddCardsClose.addEventListener('click', function () {
  closePopup(popupAddCards);
});

imagePopupClose.addEventListener('click', function () {
  closePopup(popupImageOpen);
});

export {
  addCard,
  addWebsiteCards,
  renderLoading
};