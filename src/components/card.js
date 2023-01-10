import {
  openPopup,
  closePopup
} from "./modal";

import {
  cardTemplate,
  popupImageOpen,
  popupAddCards,
  initialCards,
  cardsForm,
  placeLink,
  placeName
} from './constants';

import {
  addCard
} from "./index";

import {
  addLikeToCard,
  deleteLikeCard,
  addCardFromPopup,
  deleteCard
} from "./api";

function createCard(placeName, placeLink, placeLikes, ownerId, cardId) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.cards__remove');
  const buttonLike = cardElement.querySelector('.cards__button-like');
  const cardImage = cardElement.querySelector('.cards__image');
  const imagePopupPicture = document.querySelector('.image-popup__picture');
  const captionText = document.querySelector('.image-popup__caption');
  const placeLike = cardElement.querySelector('.cards__like-count');

  cardElement.querySelector('.cards__image').src = placeLink;
  cardElement.querySelector('.cards__image').alt = placeName;
  cardElement.querySelector('.cards__name').textContent = placeName;

  // Добавление поставленного лайка при загрузке
  if (placeLikes) {
    placeLikes.forEach(like => {
      if (like._id == '28ab16d71d783b9e7b01f84f') {
        buttonLike.classList.add('cards__button-like_active');
      }
    })
  }

  buttonLike.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('cards__button-like_active')) {
      evt.target.classList.remove('cards__button-like_active');
      deleteLikeCard(cardId)
        .then((data) => {
          placeLike.textContent = data.likes.length;
        })
    } else {
      evt.target.classList.add('cards__button-like_active');
      addLikeToCard(cardId)
        .then((data) => {
          placeLike.textContent = data.likes.length;
        })
    }
  })

  placeLike.textContent = placeLikes.length;

  if (ownerId == '28ab16d71d783b9e7b01f84f') {
    cardRemoveButton.addEventListener('click', function (evt) {
      deleteCard(cardId)
        .then(() => {
          evt.target.parentNode.remove();
        })
    })
  } else {
    cardRemoveButton.classList.add('cards__remove_hidden');
  }

  cardImage.addEventListener('click', function () {
    openPopup(popupImageOpen);

    imagePopupPicture.src = placeLink;
    captionText.textContent = placeName;
    imagePopupPicture.alt = placeName;
  })

  return cardElement;
}

// Создание карточек через попап
function addPopupCard() {

  // Отменяем стандартную отправку формы
  cardsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardFromPopup(placeName.value, placeLink.value)
      .then((card) => {
        return addCard(createCard(card.name, card.link, card.likes, card.owner._id, card._id));
      })
    cardsForm.reset();
    closePopup(popupAddCards);
  })
}

export {
  initialCards,
  createCard,
  addPopupCard,
  popupImageOpen,
  popupAddCards
};