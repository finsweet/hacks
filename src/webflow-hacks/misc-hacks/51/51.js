'use strict';
const COLUMN_SELECTORS = [
  {
    type: '[fs-hacks-element="design-column"]',
    total: '[fs-hacks-element="design-total-fee"]',
  },
  {
    type: '[fs-hacks-element="development-column"]',
    total: '[fs-hacks-element="development-total-fee"]',
  },
  {
    type: '[fs-hacks-element="subscription-column"]',
    total: '[fs-hacks-element="subscription-total-fee"]',
  },
];
document.addEventListener('DOMContentLoaded', () => {
  const TABLE_SELECTOR = '[fs-hacks-element="table"]';
  const tables = document.querySelectorAll(TABLE_SELECTOR);
  tables.forEach(updateSubTotals);
});
/**
 * Update the total fees for each column of the table.
 * @param table DOM element of the table
 */
function updateSubTotals(table) {
  COLUMN_SELECTORS.forEach(({ type, total }) => {
    let totalFee = 0;
    const columns = table.querySelectorAll(type);
    const totalDiv = table.querySelector(total);
    if (!totalDiv) return;
    columns.forEach(({ innerText }) => {
      const toBeAdded = Number(innerText);
      if (!isNaN(toBeAdded)) totalFee += toBeAdded;
    });
    totalDiv.innerText = totalFee.toString();
  });
}
