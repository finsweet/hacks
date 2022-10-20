// when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const INTEREST_FIELD_SELECTOR = '[fs-hacks-element="interest-select-field"]';
  const EMAIL_FORM_SELECTOR = '[fs-hacks-element="email-form"]';
  const interestSelectField = document.querySelector<HTMLSelectElement>(INTEREST_FIELD_SELECTOR);
  const emailForm = document.querySelector(EMAIL_FORM_SELECTOR);
  if (!interestSelectField || !emailForm) return;

  let customSuccessMessage = interestSelectField.value;

  interestSelectField.addEventListener('change', function () {
    customSuccessMessage = this.value;
  });

  emailForm.addEventListener('submit', function (e) {
    if (customSuccessMessage.trim() !== '') {
      document.cookie = 'successTextCookie=' + customSuccessMessage;
    }

    e.stopPropagation();
    interestSelectField.focus();
  });
});
