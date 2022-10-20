'use strict';
// when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const FAVICON_URL =
    'https://assets.website-files.com/5b8f3bd5334d376d704155c1/5c3610ef8b9a3107c28c79ae_hack7-custom-fav.png';
  const LINK_SELECTOR = "link[rel*='icon']";
  const link = document.querySelector(LINK_SELECTOR) || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = FAVICON_URL;
  document.head.appendChild(link);
});
