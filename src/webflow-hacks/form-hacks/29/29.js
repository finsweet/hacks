'use strict';
// when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // declare constant selectors
  const FORM_SELECTOR = '[fs-hacks-element="hack29-form"]';
  const NAME_INPUT_SELECTOR = '[fs-hacks-element="hack29-name-input"]';
  const MESSAGE_SELECTOR = '.w-form-done';
  const form = document.querySelector(FORM_SELECTOR);
  // early return
  if (!form) return;
  const nameInput = form.querySelector(NAME_INPUT_SELECTOR);
  const messageDiv = form.querySelector(MESSAGE_SELECTOR);
  if (!nameInput || !messageDiv) return;
  // when form is submitted
  form.addEventListener('submit', function () {
    const nameValue = nameInput.value;
    if (nameValue && nameValue !== '') {
      messageDiv.innerText = `Thank you, ${nameValue}!`;
    } else {
      messageDiv.innerText = 'Thank you! Your submission has been received!';
    }
  });
});
