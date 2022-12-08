function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitButton,
}) {
  return (
    <section
      className={`popup popup_type_${name} popup${isOpen ? "_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
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
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          {submitButton}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
