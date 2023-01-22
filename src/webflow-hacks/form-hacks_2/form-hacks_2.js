// when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const INTEREST_FIELD_SELECTOR = '[fs-hacks-element="interest-select-field"]';
  const EMAIL_FORM_SELECTOR = '[fs-hacks-element="email-form"]';
  const interestSelectField = document.querySelector(INTEREST_FIELD_SELECTOR);
  const emailForm = document.querySelector(EMAIL_FORM_SELECTOR);
  if (!interestSelectField || !emailForm) return;
  let customSuccessMessage = interestSelectField.value;
  interestSelectField.addEventListener('change', () => {
    customSuccessMessage = interestSelectField.value;
  });
  emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (customSuccessMessage.trim() !== '') {
      document.cookie = `successTextCookie=${customSuccessMessage};expires=Fri, 31 Dec 9999 21:10:10 GMT;path=/`;
    }
    interestSelectField.focus();
  });
});
