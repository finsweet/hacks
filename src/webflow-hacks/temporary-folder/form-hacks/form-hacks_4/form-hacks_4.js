'use strict';
document.addEventListener('DOMContentLoaded', () => {
  //assign data attributes to constants
  const FORM_BUTTON_UP_SELECTOR = '[fs-hacks-element="hack17-counter-button-up"]';
  const FORM_BUTTON_DOWN_SELECTOR = '[fs-hacks-element="hack17-counter-button-down"]';
  const COUNTER_INPUT_SELECTOR = '[fs-hacks-element="hack17-counter-input"]';
  const COUNTER_DIV_SELECTOR = '[fs-hacks-element="hack17-counter-div"]';
  // select elements with their respective data attributes
  const counterDivs = document.querySelectorAll(COUNTER_DIV_SELECTOR);
  if (!counterDivs) return;
  // loop through each counter input
  counterDivs.forEach((counterDiv) => {
    // declare individual increment and decrement buttons
    const incrementButton = counterDiv.querySelector(FORM_BUTTON_UP_SELECTOR);
    const decrementButton = counterDiv.querySelector(FORM_BUTTON_DOWN_SELECTOR);
    const counterInput = counterDiv.querySelector(COUNTER_INPUT_SELECTOR);
    if (!incrementButton || !decrementButton || !counterInput) return;
    // init the counter
    const counter = initCounter(counterInput);
    // increase counter input value upon clicking on button up
    incrementButton.addEventListener('click', counter.increment);
    // decrease counter input value upon clicking on button down
    decrementButton.addEventListener('click', counter.decrement);
  });
});
/**
 * Inits a counter input.
 * @param input The input element.
 * @returns Methods to increment and decrement the counter.
 */
const initCounter = (input) => {
  let count = 0;
  return {
    increment() {
      count += 1;
      setValue(input, count);
    },
    decrement() {
      if (count <= 0) return;
      count -= 1;
      setValue(input, count);
    },
  };
};
/**
 * Sets a numeric value to a form field.
 * @param input The input element.
 * @param value The numeric value to add.
 */
const setValue = (input, value) => {
  const stringValue = value.toString();
  input.value = stringValue;
};
