'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const FORM_SELECTOR = '[fs-hacks-element="age-gate"]';
  const YEAR_SELECTOR = '[fs-hacks-element="year"]';
  const MONTH_SELECTOR = '[fs-hacks-element="month"]';
  const DAY_SELECTOR = '[fs-hacks-element="day"]';
  const ERROR_DIV_SELECTOR = '[fs-hacks-element="error"]';
  const form = document.querySelector(FORM_SELECTOR);
  const yearElement = document.querySelector(YEAR_SELECTOR);
  const monthElement = document.querySelector(MONTH_SELECTOR);
  const dayElement = document.querySelector(DAY_SELECTOR);
  const errorDiv = document.querySelector(ERROR_DIV_SELECTOR);
  const PROTECTED_PAGE = 'https://finsweethacks.com/21';
  if (!form || !yearElement || !monthElement || !dayElement || !errorDiv) return;
  form.addEventListener('submit', () => {
    const year = yearElement.value;
    const month = monthElement.value;
    const day = dayElement.value;
    const date = year + '/' + month + '/' + day;
    if (getAge(date) >= 21) {
      localStorage.setItem('validAge', 'true');
      window.location.replace(PROTECTED_PAGE);
    } else {
      errorDiv.style.display = 'block';
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 2000);
    }
  });
});
/**
 * Returns the age of the user in years.
 * @param {string} dateString - A date string in the format 'YYYY-MM-DD'.
 * @returns {number} - The age of the user in years.
 **/
function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  // if today's date is less than user's birth date
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}
