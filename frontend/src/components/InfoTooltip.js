import React from "react";
import tooltip_false from "../images/tooltip_false.svg";
import tooltip_true from "../images/tooltip_true.svg";

function InfoTooltip({ isOpen, onClose, name, isOk }) {
  return (
    <section
      className={`popup popup_type_${name} popup${isOpen ? "_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <div className="infoTooltip__container">
          <img
            className="infoTooltip__img"
            alt="Статус"
            src={isOk ? tooltip_true : tooltip_false}
          ></img>
          <p className="infoTooltip__text">
            {isOk
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
