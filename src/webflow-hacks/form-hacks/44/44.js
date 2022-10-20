'use strict';
// when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const FORM_SELECTOR = '[fs-hacks-element="form"]';
  const SELECT_SELECTOR = '[fs-hacks-element="select"]';
  const TOTAL_SELECTOR = '[fs-hacks-element="total"]';
  const HIDDEN_TOTAL_SELECTOR = '[fs-hacks-element="hidden-total"]';
  const form = document.querySelector(FORM_SELECTOR);
  const totalDiv = document.querySelector(TOTAL_SELECTOR);
  if (!form || !totalDiv) return;
  const hiddenInput = form.querySelector(HIDDEN_TOTAL_SELECTOR);
  if (!hiddenInput) return;
  // get all selects
  const selects = form.querySelectorAll(SELECT_SELECTOR);
  // update totals div and hidden input
  updateTotals(selects, totalDiv, hiddenInput);
  // listener for form
  form.addEventListener('input', function (event) {
    const target = event.target;
    // if target has attribute has the select selector
    if (!target.matches(SELECT_SELECTOR)) return;
    // update totals div and hidden input
    updateTotals(selects, totalDiv, hiddenInput);
  });
});
/**
 * This function updates the total elements, given a list of select elements.
 * @param selects list of select elements
 * @param totalValueDiv total value div
 * @param hiddenTotalInput hidden total input element
 */
const updateTotals = (selects, totalValueDiv, hiddenTotalInput) => {
  // loop through selects, adding to total
  let total = 0;
  selects.forEach(({ value }) => {
    const toBeAdded = Number(value);
    if (!isNaN(toBeAdded)) total += toBeAdded;
  });
  // format sum e.g. 3500 to 3,500
  const formattedSum = new Intl.NumberFormat().format(total);
  totalValueDiv.innerText = formattedSum;
  // add the sum value to the hidden input
  hiddenTotalInput.value = formattedSum;
};
