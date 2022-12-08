// when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // get the heading element
  const BROWSER_NAME_SELECTOR = '[fs-hacks-element="browser-name"]';
  const browserNameElement = document.querySelector<HTMLHeadingElement>(BROWSER_NAME_SELECTOR);
  // early return if the element is not found
  if (!browserNameElement) return;

  // test for chrome
  if (navigator.vendor.match(/google/i)) {
    browserNameElement.innerText = 'Chrome';
  }
  // test for safari
  else if (navigator.vendor.match(/apple/i)) {
    browserNameElement.innerText = 'Safari';
  }
  // test for firefox
  else if (navigator.userAgent.match(/firefox\//i)) {
    browserNameElement.innerText = 'Firefox';
  }
  // test for edge
  else if (navigator.userAgent.match(/edge\//i)) {
    browserNameElement.innerText = 'Edge';
  }
  // test for IE
  else if (navigator.userAgent.match(/trident\//i)) {
    browserNameElement.innerText = 'IE - update your damn browser. All web developers hate you.';
  }
  // if none of the above browsers detected
  // display Vendor name & userAgent string
  else {
    browserNameElement.innerText = navigator.userAgent + '\n' + navigator.vendor;
  }
});
