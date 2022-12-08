import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="user">
        <div className="user__avatar">
          <img
            className="user__image"
            alt="Фото пользователя"
            src={user.avatar}
          />
          <button
            className="user__avatar-edit-button"
            type="button"
            aria-label="Редактировать фото пользователя"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="user__container">
          <div className="user__name-container">
            <h1 className="user__name">{user.name}</h1>
            <button
              className="user__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="user__profile">{user.about}</p>
        </div>
        <button
          className="user__add-button"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            link={card.link}
            name={card.name}
            likeCounter={card.likes.length}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
