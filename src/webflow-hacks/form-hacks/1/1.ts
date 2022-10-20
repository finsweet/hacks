// when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const SELECT_FIELD_SELECTOR = '[fs-hacks-element="interest-select-field"]';
  const EMAIL_SELECTOR = '[fs-hacks-element="email-form"]';
  const SUCCESS_TEXT_SELECTOR = '[fs-hacks-element="success-text"]';
  const interestSelectField = document.querySelector<HTMLSelectElement>(SELECT_FIELD_SELECTOR);
  const emailForm = document.querySelector<HTMLFormElement>(EMAIL_SELECTOR);
  const successText = document.querySelector<HTMLDivElement>(SUCCESS_TEXT_SELECTOR);
  if (!interestSelectField || !emailForm || !successText) return;

  let customSuccessMessage = interestSelectField.value;

  interestSelectField.addEventListener('change', () => {
    customSuccessMessage = interestSelectField.value;
  });

  // change the success message when the form is submitted
  emailForm.addEventListener('submit', (event) => {
    if (!customSuccessMessage) return;
    successText.innerText = `Thank you! We'll focus on ${customSuccessMessage} for future F'in sweet Webflow Hacks!`;

    event.stopPropagation();
    interestSelectField.focus();
  });
});
