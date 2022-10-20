document.addEventListener('DOMContentLoaded', () => {
  const JOBS_COUNTER_SELECTOR = '[fs-hacks-element="cms-jobs-counter"]';
  const JOB_COUNT_SELECTOR = '[fs-hacks-element="hack3-job-count"]';

  // select the element with data attribute JOB_COUNT_SELECTOR
  const jobCount = document.querySelector<HTMLElement>(JOB_COUNT_SELECTOR);
  if (!jobCount) return;

  // get the amount (length) of elements with selector JOBS_COUNTER_SELECTOR
  // and assign that amount to a constant named jobsCounter
  const jobsCounter = document.querySelectorAll(JOBS_COUNTER_SELECTOR).length;

  // set the jobsCount textContent to the value of jobsCounter
  jobCount.innerHTML = jobsCounter.toString();
});
