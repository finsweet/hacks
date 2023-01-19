'use strict';
document.addEventListener('DOMContentLoaded', function () {
  if (!location.search) return;
  // put params in DOM elements
  const urlParams = new URLSearchParams(location.search);
  for (const [key, value] of urlParams) {
    const element = document.querySelector(`[fs-hacks-param="${key}"]`);
    if (!element) continue;
    element.innerText = value;
  }
});
