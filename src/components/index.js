import '../pages/index.css';

import {
  createCard,
  popupImageOpen,
  popupAddCards
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
} from './constants';

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton);
  updateProfile(inputProfileName.value, inputProfileStatus.value)
    .then(() => {
      profileName.textContent = inputProfileName.value;
      profileStatus.textContent = inputProfileStatus.value;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    })
  closePopup(popupProfile);
})

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, avatarSubmitButton);
  updateAvatar(avatarImage.src)
    .then(() => {
      avatarImage.src = avatarLink.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    })
  closePopup(popupEditAvatar);
})


// Создание карточек через попап
cardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, cardSubmitButton);
  addCardFromPopup(placeName.value, placeLink.value)
    .then((card) => {
      addCard(createCard(card.name, card.link, card.likes, card.owner.name, card._id));
      closePopup(popupAddCards);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardSubmitButton);
    })

  cardsForm.reset();
})

// Добавление карточек на страницу
function addWebsiteCards(cards) {
  cards.forEach((card) => {
    addCard(createCard(card.name, card.link, card.likes, card.owner.name, card._id));
  })
}

// Заполнение имени профиля и профессии и загрузка карточек на страницу
Promise.all([loadWebsiteCards(), fillProfile()])
  .then(([cards, profileInfo]) => {
    avatarImage.src = profileInfo.avatar;
    profileName.textContent = profileInfo.name;
    profileStatus.textContent = profileInfo.about;
    const userId = cards._id;
    addWebsiteCards(cards.reverse(), userId);
  })
  .catch((err) => {
    console.log(err);
  })
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

