'use strict';
// when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // set the fs-hacks selector
  const ANDROID_SELECTOR = '[fs-hacks-element="android"]';
  const IOS_SELECTOR = '[fs-hacks-element="ios"]';
  const CHROME_SELECTOR = '[fs-hacks-element="chrome"]';
  const OTHER_SELECTOR = '[fs-hacks-element="other"]';
  // get the heading elements
  const androidHeading = document.querySelector(ANDROID_SELECTOR);
  const iosHeading = document.querySelector(IOS_SELECTOR);
  const chromeHeading = document.querySelector(CHROME_SELECTOR);
  const otherHeading = document.querySelector(OTHER_SELECTOR);
  if (!androidHeading || !iosHeading || !chromeHeading || !otherHeading) return;
  // test regex /android/i
  if (testBrowser(/Android/i)) {
    androidHeading.style.display = 'block';
  }
  // test for iphone, ipad, ipod
  else if (testBrowser(/iPhone|iPad|iPod/i)) {
    iosHeading.style.display = 'block';
  }
  // test for chrome
  else if (testBrowser(/chrome/i)) {
    chromeHeading.style.display = 'block';
  }
  // if none of the above are found
  else {
    otherHeading.style.display = 'block';
  }
});
/**
 * This function is used to test the userAgent string for a specific browser
 * @param regexp The regex to test the userAgent string against
 * @returns true if the userAgent string contains the regex
 */
const testBrowser = function (regexp) {
  return regexp.test(window.navigator.userAgent);
};
