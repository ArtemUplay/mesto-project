import {openPopup, closePopup} from "./modal";
import {cardTemplate, popupImageOpen, popupAddCards, initialCards, cardsForm, placeLink, placeName} from './constants';
import {addCard} from './index.js';

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

// Создание карточек через попап
function addPopupCard() {

    // Отменяем стандартную отправку формы
    cardsForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        addCard(createCard(placeName.value, placeLink.value));
        cardsForm.reset();
        closePopup(popupAddCards);
    })
}

export {initialCards, createCard, addPopupCard, popupImageOpen, popupAddCards};