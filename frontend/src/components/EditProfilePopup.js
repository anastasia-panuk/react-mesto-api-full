import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseStopPropagation }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;

    onUpdateUser({
      name,
      about: description,
    });

    form.reset();
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
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
      onCloseStopPropagation={onCloseStopPropagation}
    >
      <label className="popup__field">
        <input
          className="popup__input"
          name="user"
          value={name || ""}
          id="user"
          type="text"
          placeholder="Как вас зовут?"
          minLength="2"
          maxLength="40"
          onChange={handleName}
          required
        />
        <span className="popup__input-span error-user"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input"
          name="profile"
          value={description || ""}
          id="profile"
          type="text"
          placeholder="Расскажите о себе"
          minLength="2"
          maxLength="200"
          onChange={handleDescription}
          required
        />
        <span className="popup__input-span error-profile"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
