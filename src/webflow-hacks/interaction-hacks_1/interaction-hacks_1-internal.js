'use strict';
document.addEventListener('DOMContentLoaded', function () {
  // This is for the "Clear my 24 hour cookie" button on this Hacks template
  // this is not needed on your live site
  const CLEAR_COOKIES_BUTTON_SELECTOR = '[fs-hacks-element="clear-cookie"]';
  const clearCookiesButton = document.querySelector(CLEAR_COOKIES_BUTTON_SELECTOR);
  if (!clearCookiesButton) return;
  clearCookiesButton.onclick = () => {
    eraseCookie('seenAnimation');
  };
});
/**
 * Remove a cookie by setting it to an empty value and setting its expiration date in the past.
 * @param name The name of the cookie to remove.
 */
function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
