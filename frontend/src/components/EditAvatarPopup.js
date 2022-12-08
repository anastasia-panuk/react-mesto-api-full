import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    form.reset();
  }

  return (
    <PopupWithForm
      name="user-avatar"
      title="Обновить аватар"
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
          name="avatar"
          id="avatar"
          type="url"
          placeholder="Ссылка на Ваш новый аватар"
          required
          ref={avatarRef}
        />
        <span className="popup__input-span error-avatar"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
