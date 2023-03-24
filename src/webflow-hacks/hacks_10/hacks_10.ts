document.addEventListener('DOMContentLoaded', function () {
  const PAGE_WRAPPER_SELECTOR = '[fs-hacks-element="page-wrapper"]';
  const LOADING_WRAPPER_SELECTOR = '[fs-hacks-element="hack10-loading-wrapper"]';
  const pageWrapper = document.querySelector<HTMLElement>(PAGE_WRAPPER_SELECTOR);
  if (!pageWrapper) return;

  pageWrapper.style.display = 'none';

  const loadingWrapper = document.querySelector<HTMLElement>(LOADING_WRAPPER_SELECTOR);
  if (!loadingWrapper) return;

  // get the 'seenAnimation' cookie
  const seenAnimation = getCookie('seenAnimation');
  if (!seenAnimation) {
    loadingWrapper.style.display = 'flex';

    setTimeout(() => {
      pageWrapper.style.display = 'block';
    }, 3000);

    setCookie('seenAnimation', '1', 1);
  } else {
    loadingWrapper.style.visibility = 'hidden';
    pageWrapper.style.display = 'block';
  }
});

/**
 * Set a cookie.
 * @param cname The name of the cookie to set.
 * @param cvalue The value to set for the cookie.
 * @param exdays The number of days until the cookie expires.
 */
function setCookie(cname: string, cvalue: string, exdays: number) {
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
function getCookie(name: string) {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;
}
