/**
 * HACK 43 instructions:
 * 1. Add the radio group names correctly to each radio using the native Radio Group field in Webflow.
 * 2. Add each radio input value using the native Radio Value field in Webflow.
 */
document.addEventListener('DOMContentLoaded', function () {
  const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
  const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
  const BRANDING_GROUP_NAME = 'Branding';
  const DEVELOPMENT_GROUP_NAME = 'Development';

  // get all elements
  const totalValueDiv = document.querySelector<HTMLDivElement>(TOTAL_SELECTOR);
  const hiddenTotalInput = document.querySelector<HTMLInputElement>(HIDDEN_INPUT_SELECTOR);
  const radios = document.querySelectorAll<HTMLInputElement>(
    `input[name="${BRANDING_GROUP_NAME}"], input[name="${DEVELOPMENT_GROUP_NAME}"]`
  );
  if (!totalValueDiv || !hiddenTotalInput) return;

  let brandingTotal = 0;
  let developmentTotal = 0;

  radios.forEach((radio) => {
    // listen to the radio.
    radio.addEventListener('input', function () {
      const { name, value, checked } = radio;

      if (!checked) return;

      if (name === BRANDING_GROUP_NAME) {
        brandingTotal = Number(value);
      }

      if (name === DEVELOPMENT_GROUP_NAME) {
        developmentTotal = Number(value);
      }

      const total = brandingTotal + developmentTotal;
      updateTotals(total, totalValueDiv, hiddenTotalInput);
    });
  });
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
