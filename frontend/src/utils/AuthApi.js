const serverUrl = "https://auth.nomoreparties.co";

export const requestResult = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${serverUrl}${url}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...!!token && { 'Authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
  .then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  });
}

export const userAutentification = (password, email) => {
  return requestResult({
    url: "/signup",
    data: { password, email },
  });
};

export const userAuthorization = (password, email) => {
  return requestResult({
    url: "/signin",
    data: { password, email },
  });
};

export const getToken = (token) => {
  return requestResult({
    url: "/users/me",
    method: "GET",
    token,
  });
};