import React from "react";
import { Route, Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header({ onLogout, email, isBigScreen }) {
  // React.useEffect(() => {
  //   if(window.innerWidth < 950){
  //     window.addEventListener('resize', function() {
  //       return (
  //       <Route className="header__link" path="/main">
  //       <div className="header__container">
  //       {email} <Link to="/sign-in" onClick={onLogout} className="header__redirect-link">Выйти</Link>
  //       </div>
  //       </Route>)
  //     })
  //   }else{
  //       window.addEventListener('resize', function() {
  //         return(
  //         <Route className="header__link" path="/main">
  //         <div>Я имею другой вид</div>
  //         </Route>)
  //       })
  // }}, [])

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__redirect-link">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__redirect-link">
          Войти
        </Link>
      </Route>
      <Route className="header__link" path="/main">
        <div className="header__container">
          {email}
          <Link
            to="/sign-in"
            onClick={onLogout}
            className="header__redirect-link"
          >
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
