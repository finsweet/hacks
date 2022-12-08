'use strict';
// when dom is ready
document.addEventListener('DOMContentLoaded', function () {
  const CHECKBOX_SELECTOR = '[fs-hacks-element="checkbox"]';
  const SELECT_SELECTOR = '[fs-hacks-element="select"]';
  const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
  const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
  const BRANDING_GROUP_NAME = 'Branding';
  const DEVELOPMENT_GROUP_NAME = 'Development';
  const ADD_VALUE_ATTRIBUTE = 'fs-hacks-add-value';
  const checkboxes = document.querySelectorAll(CHECKBOX_SELECTOR);
  const totalValueDiv = document.querySelector(TOTAL_SELECTOR);
  const hiddenTotalInput = document.querySelector(HIDDEN_INPUT_SELECTOR);
  const selects = document.querySelectorAll(SELECT_SELECTOR);
  const radios = document.querySelectorAll(
    `input[name="${BRANDING_GROUP_NAME}"], input[name="${DEVELOPMENT_GROUP_NAME}"]`
  );
  if (checkboxes.length === 0 || !totalValueDiv || !hiddenTotalInput) return;
  let sum = 0;
  // add checkboxed value to sum
  for (const checkbox of checkboxes) {
    const amountToBeAdded = Number(checkbox.getAttribute(ADD_VALUE_ATTRIBUTE));
    if (isNaN(amountToBeAdded)) continue;
    if (checkbox.checked) sum += amountToBeAdded;
    checkbox.addEventListener('input', function () {
      if (checkbox.checked) {
        sum += amountToBeAdded;
      } else {
        sum -= amountToBeAdded;
      }
      updateTotals(sum, totalValueDiv, hiddenTotalInput);
    });
  }
  // add selected value to sum
  for (const select of selects) {
    const { value } = select;
    let previousSelectedValue = Number(value);
    if (!isNaN(previousSelectedValue)) sum += previousSelectedValue;
    select.addEventListener('input', function () {
      sum -= previousSelectedValue;
      previousSelectedValue = Number(select.value);
      if (!isNaN(previousSelectedValue)) sum += previousSelectedValue;
      updateTotals(sum, totalValueDiv, hiddenTotalInput);
    });
  }
  // add radio values to sum
  let brandingTotal = 0;
  let developmentTotal = 0;
  for (const radio of radios) {
    const { value, checked } = radio;
    const amountToBeAdded = Number(value);
    if (isNaN(amountToBeAdded) && checked) sum += amountToBeAdded;
    radio.addEventListener('input', function () {
      const { name, value, checked } = radio;
      if (!checked) return;
      if (name === BRANDING_GROUP_NAME) {
        sum -= brandingTotal;
        brandingTotal = Number(value);
      }
      if (name === DEVELOPMENT_GROUP_NAME) {
        sum -= developmentTotal;
        developmentTotal = Number(value);
      }
      sum += brandingTotal + developmentTotal;
      updateTotals(sum, totalValueDiv, hiddenTotalInput);
    });
  }
  // update totals on page load
  updateTotals(sum, totalValueDiv, hiddenTotalInput);
});
/**
 * This function updates the totals div and the hidden input
 * @param total
 * @param totalValueDiv
 * @param hiddenTotalInput
 */
const updateTotals = (total, totalValueDiv, hiddenTotalInput) => {
  // format sum e.g. 3500 to 3,500
  const formattedSum = new Intl.NumberFormat().format(total);
  totalValueDiv.innerText = formattedSum;
  // add the sum value to the hidden input
  hiddenTotalInput.value = formattedSum;
};
