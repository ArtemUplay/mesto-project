let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
const saveButton = popup.querySelector('.form__button');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

function editProfile() {
  const form = document.querySelector('.form');
  const inputProfileName = document.querySelector('.form__item_el_user-name');
  const inputProfileStatus = document.querySelector('.form__item_el_user-status');
  const profileName = document.querySelector('.profile__name');
  const profileStatus = document.querySelector('.profile__status');

  // Отменяем стандартную отправку формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  saveButton.addEventListener('click', function () {
    profileName.textContent = inputProfileName.value;
    profileStatus.textContent = inputProfileStatus.value;
    popup.classList.remove('popup_opened');
  })
}

editProfile();




