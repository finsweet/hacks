document.addEventListener('DOMContentLoaded', function () {
  const PAGE_WRAPPER_SELECTOR = '[fs-hacks-element="page-wrapper"]';
  const LOADING_WRAPPER_SELECTOR = '[fs-hacks-element="hack52-loading-wrapper"]';
  const pageWrapper = document.querySelector<HTMLElement>(PAGE_WRAPPER_SELECTOR);
  if (!pageWrapper) return;
  const loadingWrapper = pageWrapper.querySelector<HTMLElement>(LOADING_WRAPPER_SELECTOR);
  if (!loadingWrapper) return;

  const seenAnimation = sessionStorage.getItem('seenAnimation');
  if (!seenAnimation) {
    loadingWrapper.style.display = 'flex';

    setTimeout(() => {
      loadingWrapper.style.visibility = 'hidden';
      pageWrapper.style.display = 'block';
    }, 3000);

    sessionStorage.setItem('seenAnimation', '1');
  } else {
    // Hide the loading wrapper, show the page wrapper
    loadingWrapper.style.visibility = 'hidden';
    pageWrapper.style.display = 'block';
  }
});
