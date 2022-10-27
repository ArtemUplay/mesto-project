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

const cardTemplate = document.querySelector('#card-template').content;

function createCard(placeName, placeLink) {
  let cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.cards__image').src = placeLink;
  cardElement.querySelector('.cards__name').textContent = placeName;

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

addWebsiteCards();

function openPopup(openPopup) {
  openPopup.classList.add('popup_opened');
};

function closePopup(closePopup) {
  closePopup.classList.remove('popup_opened');
};

popupClose.addEventListener('click', function () {
  closePopup(popup);
});

editButton.addEventListener('click', function () {
  openPopup(popup);
  inputProfileName.value = profileName.textContent;
  inputProfileStatus.value = profileStatus.textContent;
});

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

addButton.addEventListener('click', function () {
  openPopup(addCardsPopup);
});

popupAddCardsClose.addEventListener('click', function () {
  closePopup(addCardsPopup);
});

// Создание карточек через попап
function addPopupCard() {
  const cardsForm = document.querySelector('.form_add-card');
  const placeName = document.querySelector('.form__item_el_name_place');
  const placeLink = document.querySelector('.form__item_el_photo-link');

  // Отменяем стандартную отправку формы
  cardsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  // initialCards.unshift({
  //   name: placeName.value,
  //   link: placeLink.value
  // });

  addCard(createCard(placeName.value, placeLink.value));

  cardsForm.reset();
}

saveCardsButton.addEventListener('click', function () {
  addPopupCard();
  closePopup(addCardsPopup);
});