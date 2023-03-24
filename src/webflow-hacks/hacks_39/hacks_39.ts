// when DOM is ready, run the function
document.addEventListener('DOMContentLoaded', function () {
  // if the page url lacks a query string
  if (!location.search) return;
  // get the params
  const searchParams = new URLSearchParams(location.search).entries();
  const allLinks = document.querySelectorAll<HTMLAnchorElement>('a[href]');
  // for each link append url params
  for (const link of allLinks) {
    const url = new URL(link.href);
    if (url.hash && url.pathname === location.pathname) return;

    for (const searchParam of searchParams) {
      url.searchParams.append(...searchParam);
    }
    link.href = url.toString();
  }
});
