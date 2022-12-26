import {openPopup, closePopup} from "./modal";

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupImageOpen = document.querySelector('.image-popup');
const popupAddCards = document.querySelector('.popup_add-card');
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

function createCard(placeName, placeLink) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    const cardRemoveButton = cardElement.querySelector('.cards__remove');
    const buttonLike = cardElement.querySelector('.cards__button-like');
    const cardImage = cardElement.querySelector('.cards__image');
    const imagePopupPicture = document.querySelector('.image-popup__picture');
    const pictureName = document.querySelector('.cards__name');
    const captionText = document.querySelector('.image-popup__caption');

    cardElement.querySelector('.cards__image').src = placeLink;
    cardElement.querySelector('.cards__image').alt = placeName;
    cardElement.querySelector('.cards__name').textContent = placeName;

    buttonLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__button-like_active');
    })

    cardRemoveButton.addEventListener('click', function () {
        cardElement.remove();
    })

    cardImage.addEventListener('click', function (evt) {
        openPopup(popupImageOpen);

        imagePopupPicture.src = evt.target.src;
        captionText.textContent = pictureName.textContent;
    })

    return cardElement;
}

function addCard(card) {
    cardsList.prepend(card);
}

function addWebsiteCards() {
    for (let i = 0; i < initialCards.length; i++) {
        addCard(createCard(initialCards[i].name, initialCards[i].link));
    }
}

// Создание карточек через попап
function addPopupCard() {
    const cardsForm = document.querySelector('.form_add-card');
    const placeName = document.querySelector('.form__item_el_name_place');
    const placeLink = document.querySelector('.form__item_el_photo-link');

    // Отменяем стандартную отправку формы
    cardsForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        addCard(createCard(placeName.value, placeLink.value));
        closePopup(popupAddCards);
    })

    cardsForm.reset();
}


export {initialCards, createCard, addCard, addWebsiteCards, addPopupCard, popupImageOpen, popupAddCards};