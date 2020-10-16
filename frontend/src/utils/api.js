import { headers, baseUrl } from './constants.js';

const handleResponse = (result) => {
  if (result.ok) {
    return result.json();
  } else {
    return Promise.reject(`Ошибка: ${result.status}`);
  }
};

class Api {
  getInitialCards() {
    return fetch(`${baseUrl}/cards`, {
      method: 'GET',
      headers: headers,
    }).then(handleResponse);
  }

  getUserInfo() {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: headers,
    }).then(handleResponse);
  }

  setUserUnfo(values) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then(handleResponse);
  }

  addCards(values) {
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      }),
    }).then(handleResponse);
  }

  likeCards(idCard) {
    return fetch(`${baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: headers,
    }).then(handleResponse);
  }

  disLikeCards(idCard) {
    return fetch(`${baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: headers,
    }).then(handleResponse);
  }

  deleteCards(idCard) {
    return fetch(`${baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: headers,
    }).then(handleResponse);
  }

  changeAvatar(values) {
    return fetch(`${baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        avatar: values.avatarUrl,
      }),
    }).then(handleResponse);
  }
}

const api = new Api();

export { api };
