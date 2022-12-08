document.addEventListener('DOMContentLoaded', function () {
  const WAIT_TIME = 4500;
  const COOKIE_NAME = 'seenGif';

  const LOADING_WRAPPER_SELECTOR = '[fs-hacks-element="loading-wrapper"]';
  const CLEAR_BUTTON_SELECTOR = '[fs-hacks-element="clear-cookie"]';
  const loadingWrapper = document.querySelector<HTMLDivElement>(LOADING_WRAPPER_SELECTOR);
  const clearButton = document.querySelector<HTMLDivElement>(CLEAR_BUTTON_SELECTOR);
  if (!loadingWrapper || !clearButton) return;

  const hasSeenPreloader = getCokie(COOKIE_NAME);
  if (hasSeenPreloader) return;

  loadingWrapper.style.display = 'flex';

  setCokie(COOKIE_NAME, 'true', 1);

  setTimeout(async () => {
    loadingWrapper.style.display = 'none';
  }, WAIT_TIME);

  clearButton.addEventListener('click', function () {
    removeCookie(COOKIE_NAME);
  });
});

/**
 * Set a cookie.
 * @param cname The name of the cookie to set.
 * @param cvalue The value to set for the cookie.
 * @param exdays The number of days until the cookie expires.
 */
function setCokie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * Get a cookie by name.
 * @param name The name of the cookie to get.
 * @returns The value of the cookie.
 * @see https://stackoverflow.com/a/25490531/104380
 */
function getCokie(name: string) {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;
}

/**
 * Remove a cookie by setting it to an empty value and setting its expiration date in the past.
 * @param name The name of the cookie to remove.
 */
function removeCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
