'use strict';
// when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const FORM_SELECTOR = '[fs-hacks-element="form"]';
  const EMAIL_SELECTOR = '[fs-hacks-element="email"]';
  const formElement = document.querySelector(FORM_SELECTOR);
  const emailInput = document.querySelector(EMAIL_SELECTOR);
  if (!formElement || !emailInput) return;
  formElement.addEventListener('submit', function (e) {
    if (!validateEmail(emailInput.value)) {
      emailInput.value = '';
      emailInput.setAttribute('placeholder', 'Please enter a valid email address');
      e.stopPropagation();
      e.preventDefault();
    }
  });
});
/**
 * Validates an email address
 * @param email email address to validate
 * @returns boolean true if valid, false if not
 */
const validateEmail = (email) => {
  const invalidDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'competitor.com'];
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) return false;
  const [, domain] = email.split('@');
  if (!domain) return false;
  return !invalidDomains.includes(domain);
};
