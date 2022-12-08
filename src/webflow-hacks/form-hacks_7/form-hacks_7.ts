// when dom is ready
document.addEventListener('DOMContentLoaded', function () {
  const CHECKBOX_SELECTOR = '[fs-hacks-element="checkbox"]';
  const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
  const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
  const checkboxes = document.querySelectorAll<HTMLInputElement>(CHECKBOX_SELECTOR);
  const totalValueDiv = document.querySelector<HTMLDivElement>(TOTAL_SELECTOR);
  const hiddenTotalInput = document.querySelector<HTMLInputElement>(HIDDEN_INPUT_SELECTOR);
  if (checkboxes.length === 0 || !totalValueDiv || !hiddenTotalInput) return;
  let sum = 0;
  for (const checkbox of checkboxes) {
    // find initial totals on page load
    const amountToBeAdded = Number(checkbox.getAttribute('add-value'));
    // if amountToBeAdded is Nan skip
    if (isNaN(amountToBeAdded)) continue;
    if (checkbox.checked) sum += amountToBeAdded;
    // add listener to checkbox
    checkbox.addEventListener('input', function () {
      // add or subtract amountToBeAdded given the checkbox state
      if (checkbox.checked) {
        sum += amountToBeAdded;
      } else {
        sum -= amountToBeAdded;
      }
      updateTotals(sum, totalValueDiv, hiddenTotalInput);
    });
  }
  // update totals on page load
  updateTotals(sum, totalValueDiv, hiddenTotalInput);
});

/***
 * This function updates the totals div and the hidden input
 * @param total
 * @param totalValueDiv
 * @param hiddenTotalInput
 */
const updateTotals = (total: number, totalValueDiv: HTMLDivElement, hiddenTotalInput: HTMLInputElement) => {
  // format sum e.g. 3500 to 3,500
  const formattedSum = new Intl.NumberFormat().format(total);
  totalValueDiv.innerText = formattedSum;
  // add the sum value to the hidden input
  hiddenTotalInput.value = formattedSum;
};
