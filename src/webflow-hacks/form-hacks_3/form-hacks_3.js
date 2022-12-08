'use strict';
// when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const SHOW_PAGE_URL_SELECTOR = '[fs-hacks-element="show-page-url"]';
  const PAGE_URL_INPUT_SELECTOR = '[fs-hacks-element="page-url-input"]';
  const pageUrl = document.querySelector(SHOW_PAGE_URL_SELECTOR);
  const pageUrlInput = document.querySelector(PAGE_URL_INPUT_SELECTOR);
  if (!pageUrl || !pageUrlInput) return;
  const url = location.href;
  pageUrlInput.value = url;
  pageUrl.innerText = url;
});
