import {
  renderLoading
} from './index';

import {
  updateProfile,
  updateAvatar
} from './api';

import {
  popups,
  popupProfile,
  popupEditClose,
  profileName,
  profileStatus,
  inputProfileName,
  inputProfileStatus,
  keyEsc,
  avatarLink,
  avatarImage,
  popupEditAvatar
} from './constants';

// Открытие попапа
function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
  window.addEventListener('keydown', closeEscPopup);
};

// Закрытие попапа
function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeEscPopup);
};

function editProfile() {
  const formEdit = document.querySelector('.form_edit');
  const formButton = formEdit.querySelector('.form__button');

  // Отменяем стандартную отправку формы
  formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderLoading(true, formButton);
    profileName.textContent = inputProfileName.value;
    profileStatus.textContent = inputProfileStatus.value;
    updateProfile(inputProfileName.value, inputProfileStatus.value)
      .finally(() => {
        renderLoading(false, formButton);
      })
    closePopup(popupProfile);
  })
};

function editAvatarProfile() {
  const formEditAvatar = document.querySelector('.form_edit-avatar');
  const formButton = formEditAvatar.querySelector('.form__button');

  // Отменяем стандартную отправку формы
  formEditAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderLoading(true, formButton);
    avatarImage.src = avatarLink.value;
    updateAvatar(avatarImage.src)
      .finally(() => {
        renderLoading(false, formButton);
      })
    closePopup(popupEditAvatar);
  })
}

// Функция закрытия попапа по кнопке ESC
function closeEscPopup(evt) {
  popups.forEach(popup => {
    if (evt.code === keyEsc && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
}

export {
  popups,
  popupProfile,
  popupEditClose,
  openPopup,
  closePopup,
  editProfile,
  profileName,
  profileStatus,
  inputProfileName,
  inputProfileStatus,
  editAvatarProfile
};