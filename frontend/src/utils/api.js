import { headers, baseUrl, newBaseUrl } from './constants.js';

const handleResponse = (result) => {
  if (result.ok) {
    return result.json();
  } else {
    return Promise.reject(`Ошибка: ${result.status}`);
  }
};

class Api {
  getInitialCards(token) {
    return fetch(`${newBaseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  setUserUnfo(values, token) {
    return fetch(`${newBaseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then(handleResponse);
  }

  addCards(values, token) {
    return fetch(`${newBaseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      }),
    }).then(handleResponse);
  }

  likeCards(idCard, token) {
    return fetch(`${newBaseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  disLikeCards(idCard, token) {
    return fetch(`${newBaseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  deleteCards(idCard, token) {
    return fetch(`${newBaseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  changeAvatar(values, token) {
    return fetch(`${newBaseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: values.avatarUrl,
      }),
    }).then(handleResponse);
  }
}

const api = new Api();

export { api };
