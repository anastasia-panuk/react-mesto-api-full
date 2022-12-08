import React from "react";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AppPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import DeliteCardConfirmPopup from "./DeliteCardConfirmPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {
  userAuthorization,
  userAutentification,
  getToken,
} from "../utils/AuthApi";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isRegistrationConfirmOpen, setIsRegistrationConfirmOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isDeleteCardConfirmOpen, setIsDeleteCardConfirmOpen] =
    React.useState(null);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isSucsessfulRequest, setIsSucsessfulRequest] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const initialData = [
      api.getUserInfoFromServer(currentUser),
      api.getCardsFromServer(),
    ];

    Promise.all(initialData)
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [history]);

  React.useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard.link
    ) {
      function handleEscKeyPress(e) {
        if (e.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEscKeyPress);

      return () => {
        document.removeEventListener("keydown", handleEscKeyPress);
      };
    }
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
  ]);

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCardConfirm(card) {
    setIsDeleteCardConfirmOpen(card);
  }

  function handleCardDelete() {
    const cardID = isDeleteCardConfirmOpen._id;
    api
      .deleteCard(cardID)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardID));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleRagisterUserData(password, email) {
    return userAutentification(password, email)
      .then(() => {
        setIsSucsessfulRequest(true);
        setIsRegistrationConfirmOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`${err} - некорректно заполнено одно из полей `);
        setIsSucsessfulRequest(false);
        setIsRegistrationConfirmOpen(true);
      });
  }

  function handleLogin(password, email) {
    return userAuthorization(password, email)
      .then(({ token }) => {
        if (!token) throw new Error("Нет токена!");
        localStorage.setItem("jwt", token);
        setLoggedIn(true);
        setEmail(email);
        history.push("/main");
      })
      .catch((err) => {
        if (err === 400) {
          console.log(`${err} - не передано одно из полей`);
        } else if (err === 401) {
          console.log(`${err} - что-то не так с email`);
        }
        setIsSucsessfulRequest(false);
        setIsRegistrationConfirmOpen(true);
      });
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/main");
        })
        .catch((err) => {
          if (err === 400) {
            console.log(
              `${err} - токен не передан или передан не в том формате`
            );
          } else if (err === 401) {
            return `${err} - переданный токен некорректен`;
          }
        });
    }
  };

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsDeleteCardConfirmOpen(null);
    setIsRegistrationConfirmOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .editUserInfo(user)
      .then((updUser) => {
        setCurrentUser({
          ...currentUser,
          name: updUser.name,
          about: updUser.about,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(user) {
    api
      .editUserAvatar(user)
      .then((updAvatar) => {
        setCurrentUser({
          ...currentUser,
          avatar: updAvatar.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <Switch>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            onLogout={handleLogout}
            email={<p className="header__user-email">{email}</p>}
          />

          <ProtectedRoute exact path={"/"} loggedIn={loggedIn}></ProtectedRoute>

          <Route path={"/sign-up"}>
            <Register onRegisterSubmit={handleRagisterUserData} />
            <p className="welcome__loggin-text">
              Уже зарегистрированы?
              <Link to="/sign-in" className="welcome__loggin-link">
                {" "}
                Войти
              </Link>
            </p>
          </Route>

          <Route path={"/sign-in"}>
            <Login onLoginSubmit={handleLogin} />
          </Route>

          <InfoTooltip
            name="login-confirm"
            isOpen={isRegistrationConfirmOpen}
            isOk={isSucsessfulRequest}
            onClose={closeAllPopups}
          />

          <ProtectedRoute path={"/main"} loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardConfirm}
              cards={cards}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AppPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <DeliteCardConfirmPopup
              isOpen={isDeleteCardConfirmOpen}
              onClose={closeAllPopups}
              onCardDeleteConform={handleCardDelete}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </ProtectedRoute>

          <Footer />
        </CurrentUserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
