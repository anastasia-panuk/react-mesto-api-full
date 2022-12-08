import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeliteCardConfirmPopup({ isOpen, onClose, onCardDeleteConform }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDeleteConform();
  }

  return (
    <PopupWithForm
      name="detite-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      submitButton={
        <button className="popup__submit-button" type="submit" aria-label="Да">
          Да
        </button>
      }
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeliteCardConfirmPopup;
