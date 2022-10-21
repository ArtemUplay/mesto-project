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

// Добавление карточек на страницу
for (let i = 0; i < initialCards.length; i++) {
  cardsList.insertAdjacentHTML('beforeend',
    `
  <li class="cards__item">
    <img src="${initialCards[i].link}" alt="Карачаевск" class="cards__image">
    <div class="cards__info">
      <h2 class="cards__name">${initialCards[i].name}</h2>
      <button type="button" class="cards__button-like"></button>
    </div>
  </li>
  `)
}

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
  formEdit.addEventListener('submit', (event) => {
    event.preventDefault();
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


function addCard() {
  const cardsForm = document.querySelector('.form_add-card');
  const placeName = document.querySelector('.form__item_el_name_place');
  const placeLink = document.querySelector('.form__item_el_photo-link');

  // Отменяем стандартную отправку формы
  cardsForm.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  initialCards.unshift({
    name: placeName.value,
    link: placeLink.value
  });

  cardsList.insertAdjacentHTML("afterbegin",
    `
  <li class="cards__item">
    <img src="${initialCards[0].link}" alt="Карачаевск" class="cards__image">
    <div class="cards__info">
      <h2 class="cards__name">${initialCards[0].name}</h2>
      <button type="button" class="cards__button-like"></button>
    </div>
  </li>
  `);
}

saveCardsButton.addEventListener('click', function () {
  addCard();
  closePopup(addCardsPopup);
});
