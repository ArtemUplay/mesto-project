import '../pages/index.css';

import {
  createCard,
  popupImageOpen,
} from './card';

import {
  popupProfile,
  openPopup,
  closePopup,
} from "./modal";

import {
  formSelectors,
  enableValidation,
  checkEmptyFields
} from './validate';

import {
  fillProfile,
  loadWebsiteCards,
  addCardFromPopup,
  updateProfile,
  updateAvatar
} from './api';

import {
  addCard,
  renderLoading
} from './utils'

import {
  cardsForm,
  cardSubmitButton,
  placeLink,
  placeName,
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
  avatarEditButton,
  popupEditAvatar,
  popupEditAvatarClose,
  avatarImage,
  formEdit,
  profileSubmitButton,
  avatarLink,
  formEditAvatar,
  avatarSubmitButton,
  popupAddCards
} from './constants';

// Валидация
enableValidation(formSelectors);

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(false, profileSubmitButton);
  updateProfile(inputProfileName.value, inputProfileStatus.value)
    .then(() => {
      profileName.textContent = inputProfileName.value;
      profileStatus.textContent = inputProfileStatus.value;
      closePopup(popupProfile);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, profileSubmitButton);
    })
})

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(false, avatarSubmitButton);
  updateAvatar(avatarImage.src)
    .then(() => {
      avatarImage.src = avatarLink.value;
      formEditAvatar.reset();
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, avatarSubmitButton);
    })
})

// Создание карточек через попап
cardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(false, cardSubmitButton);
  addCardFromPopup(placeName.value, placeLink.value)
    .then((card) => {
      addCard(createCard(card.name, card.link, card.likes, card.owner._id, card._id, card.owner._id));
      cardsForm.reset();
      closePopup(popupAddCards);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, cardSubmitButton);
    })
})

// Добавление карточек на страницу
function addWebsiteCards(cards, userId) {
  console.log(cards);
  cards.forEach((card) => {
    addCard(createCard(card.name, card.link, card.likes, card.owner._id, card._id, userId));
  })
}

// Заполнение имени профиля и профессии и загрузка карточек на страницу
Promise.all([loadWebsiteCards(), fillProfile()])
  .then(([cards, profileInfo]) => {
    avatarImage.src = profileInfo.avatar;
    profileName.textContent = profileInfo.name;
    profileStatus.textContent = profileInfo.about;
    const userId = profileInfo._id;
    addWebsiteCards(cards.reverse(), userId);
  })
  .catch((err) => {
    console.log(err);
  })

// Закрытие попапов кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
})

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

