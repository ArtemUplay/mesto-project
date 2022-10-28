const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const inputProfileName = document.querySelector('.form__item_el_user-name');
const inputProfileStatus = document.querySelector('.form__item_el_user-status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupAddCardsClose = document.querySelector('.popup__close_add-card');
const saveEditButton = popup.querySelector('.form__button_edit');
const addButton = document.querySelector('.profile__add-button');
const addCardsPopup = document.querySelector('.popup_add-card');
const saveCardsButton = document.querySelector('.form__button_add-card');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
const openPopupImage = document.querySelector('.image-popup');
const imagePopupClose = document.querySelector('.popup__close_image-popup');
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
  let cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.cards__image').src = placeLink;
  cardElement.querySelector('.cards__image').alt = placeName;
  cardElement.querySelector('.cards__name').textContent = placeName;

  return cardElement;
}

// Удаление карточки
function removeCard() {
  const removeCardButton = document.querySelector('.cards__remove');

  removeCardButton.addEventListener('click', function (evt) {
    const card = removeCardButton.closest('.cards__item');
    card.remove();
  })
}

// Открытие попапа с картинкой
function openImage() {
  const cardImage = document.querySelector('.cards__image');
  const imagePopupPicture = document.querySelector('.image-popup__picture');
  const pictureName = document.querySelector('.cards__name');
  const captionText = document.querySelector('.image-popup__caption');

  cardImage.addEventListener('click', function (evt) {
    openPopup(openPopupImage);

    imagePopupPicture.src = evt.target.src;
    captionText.textContent = pictureName.textContent;
  })
}

function addCard(card) {
  cardsList.prepend(card);

  const likeButton = document.querySelector('.cards__button-like');

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_active');
  })

  removeCard();
  openImage();
}

function addWebsiteCards() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(createCard(initialCards[i].name, initialCards[i].link));
  }
}

addWebsiteCards();

// Открытие попапа
function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
};

// Закрытие попапа
function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
};

function editProfile() {
  const formEdit = document.querySelector('.form_edit');

  // Отменяем стандартную отправку формы
  formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  saveEditButton.addEventListener('click', function () {
    profileName.textContent = inputProfileName.value;
    profileStatus.textContent = inputProfileStatus.value;
    closePopup(popup);
  })
};

editProfile();

// Создание карточек через попап
function addPopupCard() {
  const cardsForm = document.querySelector('.form_add-card');
  const placeName = document.querySelector('.form__item_el_name_place');
  const placeLink = document.querySelector('.form__item_el_photo-link');

  // Отменяем стандартную отправку формы
  cardsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  addCard(createCard(placeName.value, placeLink.value));

  cardsForm.reset();
}

popupClose.addEventListener('click', function () {
  closePopup(popup);
});

editButton.addEventListener('click', function () {
  openPopup(popup);
  inputProfileName.value = profileName.textContent;
  inputProfileStatus.value = profileStatus.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(addCardsPopup);
});

popupAddCardsClose.addEventListener('click', function () {
  closePopup(addCardsPopup);
});

saveCardsButton.addEventListener('click', function () {
  addPopupCard();
  closePopup(addCardsPopup);
});

imagePopupClose.addEventListener('click', function () {
  closePopup(openPopupImage);
})