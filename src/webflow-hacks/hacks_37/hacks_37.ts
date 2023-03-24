/**
 * Open the last tab the user had open when they revisit the page.
 * @returns {void}
 */
function initializeTabs(): void {
  const STORAGE_KEY: string = 'previousTabId';
  const tabLinks: NodeListOf<Element> = document.querySelectorAll('[fs-anchor-element="tab"]');

  if (tabLinks.length === 0) return;

  const chosenTabId: string | null = localStorage.getItem(STORAGE_KEY);

  tabLinks.forEach((tabLink: Element) => {
    const currentTabId: string | null = tabLink.getAttribute('data-w-tab');

    // Trigger click event on the chosen tab
    if (chosenTabId === currentTabId) {
      const tabEvent: CustomEvent = new CustomEvent('click');
      tabLink.dispatchEvent(tabEvent);
    }

    // Save the clicked tab to localStorage
    tabLink.addEventListener('click', () => {
      if (currentTabId) {
        localStorage.setItem(STORAGE_KEY, currentTabId);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if Webflow is loaded and use Webflow.push to run the function
  if (window.Webflow && window.Webflow.push) {
    window.Webflow.push(initializeTabs);
  } else {
    // Fallback to the readystatechange event
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        initializeTabs();
      }
    });
  }
});
