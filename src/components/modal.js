const popups = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const inputProfileName = document.querySelector('.form__item_el_user-name');
const inputProfileStatus = document.querySelector('.form__item_el_user-status');

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
        if (evt.code === "Escape") {
            closePopup(popup);
        }
    })
}

export {popups, popupProfile, popupClose, openPopup, closePopup, editProfile, closeEscPopup, profileName, profileStatus, inputProfileName, inputProfileStatus};