'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const FORM_SELECTOR = '[fs-hacks-element="hack38-form"]';
  const SUCCESS_TRIGGER_SELECTOR = '[fs-hacks-element="hack38-form-success-trigger"]';
  // assign form HTML element to variable form
  const form = document.querySelector(FORM_SELECTOR);
  // assign success trigger HTML element to variable successTrigger
  const successTrigger = document.querySelector(SUCCESS_TRIGGER_SELECTOR);
  if (!form || !successTrigger) return;
  // when form is submitted, execute function triggering submission success
  const submitEvent = () => {
    form.onsubmit = triggerSuccess;
  };
  // click our invisible div to that triggers our Webflow Interaction
  const triggerSuccess = () => {
    successTrigger.click();
  };
  window.onload = submitEvent;
});
