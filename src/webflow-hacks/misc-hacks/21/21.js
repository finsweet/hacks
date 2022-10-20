'use strict';
/* put all of this code in <head> of Site Settings if you want to
gate every page on your site until the age gate is filled out! */
const AGE_GATE_URL = '/success/21-age-gate';
if (!localStorage.getItem('validAge') && window.location.href !== AGE_GATE_URL) {
  // redirect to /age-gate page
  window.location.replace(AGE_GATE_URL);
}
