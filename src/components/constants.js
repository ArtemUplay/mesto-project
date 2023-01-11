// Для card.js
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupImageOpen = document.querySelector('.image-popup');
const popupAddCards = document.querySelector('.popup_add-card');
const cardsForm = document.querySelector('.form_add-card');
const placeName = document.querySelector('.form__item_el_name_place');
const placeLink = document.querySelector('.form__item_el_photo-link');
const cardSubmitButton = cardsForm.querySelector('.form__button');
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

// Для validate.js
const formSelectors = {
    formSelector: 'form',
    inputSelector: 'form__item',
    submitButtonSelector: 'form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active',
};

// Для index.js
const formEdit = document.querySelector('.form_edit');
const profileSubmitButton = formEdit.querySelector('.form__button');
const avatarEditButton = document.querySelector('.profile__edit-avatar');
const popupEditAvatar = document.querySelector('.popup-avatar');
const popupEditAvatarClose = popupEditAvatar.querySelector('.popup__close');
const formEditAvatar = document.querySelector('.form_edit-avatar');
const avatarSubmitButton = formEditAvatar.querySelector('.form__button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupAddCardsClose = document.querySelector('.popup__close_add-card');
const buttonAddPhotos = document.querySelector('.profile__add-button');
const imagePopupClose = document.querySelector('.popup__close_image-popup');

// Для modal.js
const popups = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup-edit-profile');
const avatarLink = popupEditAvatar.querySelector('.form__item_el_avatar-link');
const avatarImage = document.querySelector('.profile__avatar-image');
const popupEditClose = popupProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const inputProfileName = document.querySelector('.form__item_el_user-name');
const inputProfileStatus = document.querySelector('.form__item_el_user-status');
const keyEsc = 'Escape';

export {
    cardsList,
    cardTemplate,
    popupImageOpen,
    popupAddCards,
    cardsForm,
    cardSubmitButton,
    placeName,
    placeLink,
    initialCards,
    formSelectors,
    avatarEditButton,
    formEditAvatar,
    avatarSubmitButton,
    popupEditAvatar,
    popupEditAvatarClose,
    avatarLink,
    avatarImage,
    buttonEditProfile,
    popupAddCardsClose,
    buttonAddPhotos,
    imagePopupClose,
    popups, popupProfile,
    popupEditClose,
    profileName,
    profileStatus,
    inputProfileName,
    inputProfileStatus,
    keyEsc,
    formEdit,
    profileSubmitButton,
};