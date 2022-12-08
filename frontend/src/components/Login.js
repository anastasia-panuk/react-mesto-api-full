import React from "react";
import WelcomeForm from "./WelcomeForm";

function Login({ onLoginSubmit }) {
  const [state, setState] = React.useState({
    password: "",
    email: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { password, email } = state;
    onLoginSubmit(password, email);
  }

  return (
    <WelcomeForm
      name="login"
      title="Вход"
      label="Войти"
      buttonTitle="Войти"
      link="#"
      linkName=""
      onSubmit={handleSubmit}
    >
      <input
        className="welcome__input"
        name="email"
        id="email"
        type="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <input
        className="welcome__input"
        name="password"
        id="password"
        type="password"
        placeholder="Пароль"
        minLength="8"
        maxLength="200"
        required
        onChange={handleChange}
      />
    </WelcomeForm>
  );
}

export default Login;
