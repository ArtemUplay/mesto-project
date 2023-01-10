const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '0e083d33-4c82-42a0-a1bf-2a5f281af68c',
    'Content-Type': 'application/json'
  }
}

// Проверка статуса ответа от сервера
const checkStatusResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}

// Заполнение имени профиля и профессии
const fillProfile = (profileName, profileStatus, avatarImage) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

// Загрузка карточек на страницу
const loadWebsiteCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

// Обновление профиля
const updateProfile = (inputProfileName, inputProfileStatus) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputProfileName,
      about: inputProfileStatus
    })
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

// Добавление карточки
const addCardFromPopup = (placeName, placeLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink
    })
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

// Удаление карточки
const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

// Добавление лайка карточке
const addLikeToCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      return checkStatusResponse(res);
    })
}

// Удаление лайка у карточки
const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

//Обновление фото у уватара
const updateAvatar = (avatarImage) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarImage
    })
  })
    .then(response => {
      return checkStatusResponse(response);
    })
}

export {
  fillProfile,
  updateProfile,
  loadWebsiteCards,
  addCardFromPopup,
  deleteCard,
  addLikeToCard,
  deleteLikeCard,
  updateAvatar
};