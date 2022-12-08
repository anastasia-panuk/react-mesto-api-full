function WelcomeForm({ name, title, children, label, buttonTitle, onSubmit }) {
  return (
    <section className={`welcome welcome_type_${name}`}>
      <div className="welcome__container">
        <form className="welcome__form" name={`${name}`} onSubmit={onSubmit}>
          <h2 className="welcome__title">{title}</h2>
          {children}
          <button
            className={`welcome__submit-button welcome__submit-button_type_${name}`}
            type="submit"
            aria-label={`${label}`}
          >{`${buttonTitle}`}</button>
        </form>
      </div>
    </section>
  );
}

export default WelcomeForm;
