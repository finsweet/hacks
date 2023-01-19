'use strict';
// when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // get the element
  const INPUT_SELECTOR = '[fs-hacks-element="name-input"]';
  const TEXT_SELECTOR = '[fs-hacks-element="name-text"]';
  const textElement = document.querySelector(TEXT_SELECTOR);
  const inputElement = document.querySelector(INPUT_SELECTOR);
  // early return if no element found
  if (!textElement || !inputElement) return;
  // on every input field key stroke
  inputElement.addEventListener('input', function () {
    // set the text content as the input field value
    textElement.innerText = this.value;
  });
});
