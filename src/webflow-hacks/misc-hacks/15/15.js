'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const MENU_BUTTON_SELECTOR = '[fs-hacks-element="menu-button"]';
  const menuBtns = document.querySelectorAll(MENU_BUTTON_SELECTOR);
  menuBtns.forEach(function (menuBtn) {
    menuBtn.addEventListener('click', function () {
      //  allow hash to be set by adding small delay
      setTimeout(removeHash);
    });
  });
});
/**
 * Remove the hash from the URL.
 */
function removeHash() {
  history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
}
