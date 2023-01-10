import {
  cardsList
} from './constants';

// Функция смены текста в кнопке в попапе при загрузке
function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = 'Сохранение...';
  } else {
    formButton.textContent = 'Сохранить';
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