import {
  openPopup,
} from "./modal";

import {
  cardTemplate,
  popupImageOpen,
  popupAddCards,
  initialCards,
  profileName,
} from './constants';

import {
  addLikeToCard,
  deleteLikeCard,
  deleteCard
} from "./api";

function createCard(placeName, placeLink, placeLikes, ownerName, cardId) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.cards__remove');
  const buttonLike = cardElement.querySelector('.cards__button-like');
  const cardImage = cardElement.querySelector('.cards__image');
  const imagePopupPicture = document.querySelector('.image-popup__picture');
  const captionText = document.querySelector('.image-popup__caption');
  const placeLike = cardElement.querySelector('.cards__like-count');

  cardImage.src = placeLink;
  cardImage.alt = placeName;
  cardElement.querySelector('.cards__name').textContent = placeName;

  // Добавление поставленного лайка при загрузке
  if (placeLikes) {
    placeLikes.forEach(like => {
      if (like.name == profileName.textContent) {
        buttonLike.classList.add('cards__button-like_active');
      }
    })
  }

  buttonLike.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('cards__button-like_active')) {
      deleteLikeCard(cardId)
        .then((data) => {
          evt.target.classList.remove('cards__button-like_active');
          placeLike.textContent = data.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      addLikeToCard(cardId)
        .then((data) => {
          evt.target.classList.add('cards__button-like_active');
          placeLike.textContent = data.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    }
  })

  placeLike.textContent = placeLikes.length;

  if (ownerName == profileName.textContent) {
    cardRemoveButton.addEventListener('click', function (evt) {
      deleteCard(cardId)
        .then(() => {
          evt.target.closest('.cards__item').remove();
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

export {
  initialCards,
  createCard,
  popupImageOpen,
  popupAddCards
};