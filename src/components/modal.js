import {
  popups,
  popupProfile,
  popupEditClose,
  profileName,
  profileStatus,
  inputProfileName,
  inputProfileStatus,
  keyEsc,
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

// Функция закрытия попапа по кнопке ESC
const closeEscPopup = (evt) => {
  if (evt.key === keyEsc) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

export {
  popups,
  popupProfile,
  popupEditClose,
  openPopup,
  closePopup,
  profileName,
  profileStatus,
  inputProfileName,
  inputProfileStatus,
};