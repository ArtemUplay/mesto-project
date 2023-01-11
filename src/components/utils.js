import {
  cardsList,
} from './constants';

// Функция смены текста в кнопке в попапе при загрузке
function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = 'Сохранить';
    formButton.classList.add('form__button_disabled');
    formButton.disabled = true;
  } else {
    formButton.textContent = 'Сохранение...';
    formButton.classList.remove('form__button_disabled');
    formButton.disabled = false;
  }
}

// Добавление карточки в контейнер
function addCard(card) {
  cardsList.prepend(card);
}

export {
  renderLoading,
  addCard
}