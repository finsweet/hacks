// on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // selectors
  const DATE_VERSION_ONE_SELECTOR = '[fs-hacks-element="date-version1"]';
  const DATE_VERSION_TWO_SELECTOR = '[fs-hacks-element="date-version2"]';
  const dateVersionOne = document.querySelector<HTMLHeadingElement>(DATE_VERSION_ONE_SELECTOR);
  const dateVersionTwo = document.querySelector<HTMLHeadingElement>(DATE_VERSION_TWO_SELECTOR);
  // early exit if no elements found
  if (!dateVersionOne || !dateVersionTwo) return;
  // Set your formatting options e.g. Version 1 output = "Sat, Dec 25, 2019"
  // See more available options at {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options}
  const dateVersion1Format: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  //Version 2 output = "12/25/19"
  const dateVersion2Format: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };
  dateVersionOne.innerText = new Date().toLocaleDateString('en-US', dateVersion1Format);
  dateVersionTwo.innerText = new Date().toLocaleDateString('en-US', dateVersion2Format);
});
