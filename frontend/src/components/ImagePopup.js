function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_picture popup${card.link ? "_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_image"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={`${card.link}`}
            alt={`${card.name}`}
          />
          <figcaption className="popup__figcaption">{`${card.name}`}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
