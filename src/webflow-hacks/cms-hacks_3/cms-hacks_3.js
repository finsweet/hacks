'use strict';
// when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const CMS_LIST_SELECTOR = '[fs-hacks-selector="cms-list"]';
  const CMS_TITLE_SELECTOR = '[fs-hacks-selector="cms-title"]';
  // get elemnts
  const cmsList = document.querySelector(CMS_LIST_SELECTOR);
  const cmsTitle = document.querySelector(CMS_TITLE_SELECTOR);
  // if elements are not found, exit
  if (!cmsList || !cmsTitle) return;
  // find child elements
  if (cmsList.childNodes.length === 0) {
    // hide title
    cmsTitle.style.display = 'none';
  }
});
