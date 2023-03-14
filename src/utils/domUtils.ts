import { CopyJSONButton } from '@finsweet/ts-utils';

import { hackName, copyComponentButton } from '$utils/constants';

// import type { Code } from '$utils/types';

/**
 * Prepare code for display on DOM
 * @param code string
 * @returns string
 */
export const formatCode = (code: string) => {
  code = code.replace(/ /g, '&nbsp;');
  const script = `<script>\n${code}</script>`.replace(/</g, '&lt;');
  return `<pre><code>${script}</pre></code>`;
};

/**
 * Add sript tag to head of document.
 * @param url the src string
 */
export const appendHeadScript = (url: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
};

// utility function to handle the fetching the TS and JS code
const fetchCode = async (url: string) => {
  const res = await fetch(url);
  if (res.ok) {
    // will be used to append to make the demo component functional
    const unformattedCode = await res.text();
    // will be used to display the code in the hacks page as visible text
    const formattedCode = formatCode(unformattedCode);
    return { unformattedCode, formattedCode };
  }
  //throw new Error('Error fetching and/or formatting code');
  return;
};

// append js code to make the demo component functional
export const appendJsCode = (formattedCode: string) => {
  const script = document.createElement('script');
  script.innerHTML = formattedCode;
  document.body.appendChild(script);
  // Dispatch the DOMContentLoaded event to trigger hack JS
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
};

export const fetchDemoComponent = async () => {
  const demoWrapper = document.querySelector('[fs-div-element="demo_wrapper"]');
  if (!demoWrapper) return;

  const currentUrl = window.location.href;
  const isProduction = currentUrl.includes('finsweet.com') ? true : false;

  console.log('isProduction', isProduction);

  const componentsURL = isProduction
    ? 'https://finsweet.com/hacks-typescript/components'
    : 'https://hacks-in-ts.webflow.io/components';

  const res = await fetch(componentsURL);
  //const res = await fetch('https://hacks-in-ts-ae00034f9e8a6fd53d30a742748.webflow.io/components');

  if (res.ok) {
    const html = await res.text();
    const parser = new DOMParser();
    // Insert the HTML code into the page
    const doc = parser.parseFromString(html, 'text/html');
    // Get the demo component
    const demoComponent = doc.querySelector(`[fs-component-name="${hackName}"]`);
    if (!demoComponent) return;
    demoWrapper.prepend(demoComponent);
  } else {
    //throw new Error('Could not fetch demo component');
    return;
  }
};

export const fetchTsCode = async () => {
  if (!hackName) return;
  const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@44910d22e29f63f9afb19b8b49a5dfcc9bd99739/src/webflow-hacks/${hackName}/${hackName}.ts`;
  const code = await fetchCode(url);
  if (!code) return;
  const { formattedCode } = code;
  const tsWrapper = document.querySelector('[fs-div-element="ts_wrapper"]') as HTMLElement;
  if (!tsWrapper) return;
  tsWrapper.innerHTML = formattedCode;
};

export const fetchJsCode = async () => {
  const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@44910d22e29f63f9afb19b8b49a5dfcc9bd99739/src/webflow-hacks/${hackName}/${hackName}.js`;
  const code = await fetchCode(url);
  if (!code) return;
  const { formattedCode } = code;

  const { unformattedCode } = code;

  const jsWrapper = document.querySelector('[fs-div-element="js_wrapper"]') as HTMLElement;
  if (!jsWrapper) return;
  jsWrapper.innerHTML = formattedCode;
  return unformattedCode;
};

const fetchComponentJSON = async () => {
  if (!hackName) return;
  // !! TO DO: if possible, dynamically fetch the latest commit version, i.e. text after the @
  const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@44910d22e29f63f9afb19b8b49a5dfcc9bd99739/src/webflow-hacks/${hackName}/${hackName}.json`;

  const componentJSON = await fetch(url);
  return componentJSON.json();
};

export const copyComponentJSON = async () => {
  const copyData = await fetchComponentJSON();
  if (!copyComponentButton) return;
  new CopyJSONButton({
    element: copyComponentButton,
    copyData,
  });
};

// notify the user that the code has been copied
const changeCopyButtonText = (buttonElement: HTMLElement) => {
  const previousText = buttonElement.innerText;
  buttonElement.innerText = 'Copied!';
  setTimeout(() => {
    buttonElement.innerText = previousText;
  }, 2000);
};

export const copyCode = () => {
  const copyButtons = document.querySelectorAll('[fs-copyclip-element="click"]');
  copyButtons.forEach((button) => {
    // listen to ts and js copy buttons
    button.addEventListener('click', () => {
      const codeTabMenu = document.querySelector('[fs-div-element="code_tab_content"]');
      if (!codeTabMenu) return;
      const activeTab = codeTabMenu.querySelector('.w--tab-active');
      if (!activeTab) return;
      // Get code of active tab (TS or JS)
      const code = activeTab.getElementsByTagName('code')[0].innerText;
      const copyText = code;

      // Create a temporary element for the text
      const tempInput = document.createElement('textarea');
      tempInput.innerHTML = copyText;

      // Add the temporary element to the DOM and select it
      document.body.appendChild(tempInput);
      tempInput.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary element from the DOM
      document.body.removeChild(tempInput);
      const buttonElement = button.lastChild as HTMLDivElement;
      changeCopyButtonText(buttonElement);
    });
  });
};

export const storeUserPreference = () => {
  const tabButtons = document.querySelectorAll('[fs-button-element="tab_button"]');

  // when the user clicks on JS or TS, store the preference in local storage
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const attributeValue = button.getAttribute('fs-type-element');
      if (!attributeValue) return;
      const getUserPreference = () => {
        if (attributeValue === 'js') {
          const preference = 'js';
          return preference;
        }
        {
          const preference = 'ts';
          return preference;
        }
      };
      const preference = getUserPreference();
      localStorage.setItem('userPreference', preference);
    });
  });
};

// to work properly, active tab on webflow designer must be set to "none"
// otherwise, restartWebflow() function will mess with active tab
export const setActiveTab = () => {
  const pref = localStorage.getItem('userPreference');
  if (pref === 'js') {
    const jsTab = document.querySelector('[fs-type-element="js"]') as HTMLElement;
    if (!jsTab) return;
    jsTab.click();
  } else {
    // if the user has not set a preference, default to TS
    // if user has set TS preference, set active tab as TS
    const tsTab = document.querySelector('[fs-type-element="ts"]') as HTMLElement;
    if (!tsTab) return;
    tsTab.click();
  }
};

export const displayCodeWrapper = () => {
  const codeWrapper = document.querySelector('[fs-div-element="code_tab_wrapper"]');
  // make the code wrapper visible after user preferense was retrieved
  codeWrapper?.setAttribute('style', 'display: block');
};
export const displayDemoWrapper = () => {
  const demoWrapper = document.querySelector('[fs-div-element="demo_wrapper"]');
  // make the demo wrapper visible after user preferense was retrieved
  demoWrapper?.setAttribute('style', 'display: grid');
};
