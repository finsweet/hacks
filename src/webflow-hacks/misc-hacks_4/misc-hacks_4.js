'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const BUTTON_SELECTOR = '[fs-hacks-element="hack-button"]';
  const TEXT_SELECTOR = '[fs-hacks-element="hack-text"]';
  const button = document.querySelector(BUTTON_SELECTOR);
  const textElement = document.querySelector(TEXT_SELECTOR);
  if (!button || !textElement) return;
  button.addEventListener('click', () => {
    textElement.innerHTML = 'This is me on Webflow.';
  });
});
