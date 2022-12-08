import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({
  link,
  name,
  card,
  likeCounter,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some((i) => i._id === user._id);

  const cardDeleteButtonClassName = `${
    isOwn ? "card__trash-button" : "card__trash-button_invisible"
  }`;

  const cardLikeButtonClassName = `${
    !isLiked ? "card__like-button" : "card__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        className={cardDeleteButtonClassName}
        name="card__trash-button"
        type="button"
        aria-label="Корзина"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="card__image"
        src={`${link}`}
        alt={`${name}`}
        onClick={handleClick}
      />
      <div className="card__container">
        <h2 className="card__name">{`${name}`}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            name="card__like-button"
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{`${likeCounter}`}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
