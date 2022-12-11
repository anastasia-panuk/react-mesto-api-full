class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._headers = data.headers;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
    }
  }

  getUserInfoFromServer() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  getCardsFromServer() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  editUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._requestResult(res));
  }

  editUserAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._requestResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  }

  changeLikeCardStatus(_id, likeCardStatus) {
    if(likeCardStatus) {
    return fetch(`${this._serverUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  } else {
    return fetch(`${this._serverUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
}

  deleteCard(_id) {
    return fetch(`${this._serverUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  setToken(token) {
    this._headers.authorization = token;
  }
}

const api = new Api({
  serverUrl: "http://localhost:3001",
  headers: {
    authorization: '',
    "Content-Type": "application/json",
  },
});

export default api;
