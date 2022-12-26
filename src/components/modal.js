import {popups, popupProfile, popupClose, profileName, profileStatus,inputProfileName, inputProfileStatus, keyEsc} from './constants';

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

    // Отменяем стандартную отправку формы
    formEdit.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileName.textContent = inputProfileName.value;
        profileStatus.textContent = inputProfileStatus.value;
        closePopup(popupProfile);
    })
};

// Функция закрытия попапа по кнопке ESC
function closeEscPopup(evt) {
    popups.forEach(popup => {
        if (evt.code === keyEsc && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
}

export {popups, popupProfile, popupClose, openPopup, closePopup, editProfile, closeEscPopup, profileName, profileStatus, inputProfileName, inputProfileStatus};