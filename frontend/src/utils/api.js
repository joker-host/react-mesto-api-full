import { baseUrl } from './constants.js';

const handleResponse = (result) => {
  if (result.ok) {
    return result.json();
  } else {
    return Promise.reject(`Ошибка: ${result.status}`);
  }
};

class Api {
  getInitialCards(token) {
    return fetch(`${baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  setUserUnfo(values, token) {
    return fetch(`${baseUrl}/users/me`, {
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
    return fetch(`${baseUrl}/cards`, {
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
    return fetch(`${baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  disLikeCards(idCard, token) {
    return fetch(`${baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  deleteCards(idCard, token) {
    return fetch(`${baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
  }

  changeAvatar(values, token) {
    return fetch(`${baseUrl}/users/me/avatar`, {
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

  register(email, password) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  authorize(email, password) {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api();

export { api };
