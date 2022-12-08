import React from "react";
import PopupWithForm from "./PopupWithForm";

function AppPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });

    form.reset();
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButton={
        <button
          className="popup__submit-button"
          type="submit"
          aria-label="Сохранить"
        >
          Сохранить
        </button>
      }
    >
      <label className="popup__field">
        <input
          className="popup__input"
          name="name"
          id="name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          ref={nameRef}
          required
        />
        <span className="popup__input-span error-name"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input"
          name="link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          ref={linkRef}
          required
        />
        <span className="popup__input-span error-link"></span>
      </label>
    </PopupWithForm>
  );
}

export default AppPlacePopup;
