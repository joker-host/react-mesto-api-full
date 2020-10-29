import { baseUrl } from './constants.js';

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
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(handleResponse);
  }

  setUserUnfo(values) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then(handleResponse);
  }

  addCards(values) {
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      }),
    }).then(handleResponse);
  }

  likeCards(idCard) {
    return fetch(`${baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(handleResponse);
  }

  disLikeCards(idCard) {
    return fetch(`${baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(handleResponse);
  }

  deleteCards(idCard, token) {
    return fetch(`${baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(handleResponse);
  }

  changeAvatar(values) {
    return fetch(`${baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: values.avatarUrl,
      }),
    }).then(handleResponse);
  }

  register(email, password) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      // mode: 'no-cors',
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
      // mode: 'no-cors',
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
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
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
