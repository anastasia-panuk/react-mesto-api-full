class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._token = data.token;
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
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }

  getCardsFromServer() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }

  editUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._requestResult(res));
  }

  editUserAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._requestResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  }

  changeLikeCardStatus(card, likeCardStatus) {
    return fetch(`${this._serverUrl}/cards/${card}/likes/`, {
      method: likeCardStatus ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }

  deleteCard(_id) {
    return fetch(`${this._serverUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this._requestResult(res));
  }
}

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-48",
  token: "628877ed-b851-464f-b36a-d22d6951fc4a",
});

export default api;
