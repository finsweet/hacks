'use strict';
// when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const BACK_ONE_SELECTOR = '[fs-hacks-element="hack13-back-1"]';
  const BACK_TWO_SELECTOR = '[fs-hacks-element="hack13-back-2"]';
  const backOne = document.querySelector(BACK_ONE_SELECTOR);
  const backTwo = document.querySelector(BACK_TWO_SELECTOR);
  if (!backOne || !backTwo) return;
  backOne.addEventListener('click', function (e) {
    e.preventDefault();
    window.history.back();
  });
  backTwo.addEventListener('click', function (e) {
    e.preventDefault();
    window.history.go(-2);
  });
});
