document.addEventListener('DOMContentLoaded', () => {
  const BUTTON_SELECTOR = '[fs-hacks-element="hack-button"]';
  const TEXT_SELECTOR = '[fs-hacks-element="hack-text"]';
  const button = document.querySelector<HTMLButtonElement>(BUTTON_SELECTOR);
  const textElement = document.querySelector<HTMLDivElement>(TEXT_SELECTOR);
  if (!button || !textElement) return;

  button.addEventListener('click', () => {
    textElement.innerHTML = 'This is me on Webflow.';
  });
});
