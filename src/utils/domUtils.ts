import { CopyJSONButton } from '@finsweet/ts-utils';

import { hackName, copyComponentButton } from '$utils/constants';
import type { Code } from '$utils/types';

/**
 * Prepare code for display on DOM
 * @param code string
 * @returns string
 */
const formatCode = (code: string) => {
  code = code.replace(/ /g, '&nbsp;');
  const script = `<script>\n${code}</script>`.replace(/</g, '&lt;');
  return `<pre><code>${script}</pre></code>`;
};

/**
 * Add sript tag to head of document.
 * @param url the src string
 */
export const appendHeadScript = async (url: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  await document.head.appendChild(script);
};

// utility function to handle the fetching the TS and JS code
const fetchCode = async (url: string) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      // will be used to append to make the demo component functional
      const unformattedCode = await res.text();
      // will be used to display the code in the hacks page as visible text
      const formattedCode = formatCode(unformattedCode);
      return { unformattedCode, formattedCode };
    }
    throw new Error('Error fetching and/or formatting code');
  } catch (error) {
    console.error(error);
  }
};

// append js code to make the demo component functional
export const appendJsCode = async (formattedCode: string) => {
  const script = document.createElement('script');
  script.innerHTML = formattedCode;
  document.body.appendChild(script);
  // Dispatch the DOMContentLoaded event to trigger hack JS
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
};

export const fetchDemoComponent = async () => {
  const demoContainer = document.querySelector('[fs-element="demo_container"]');
  if (!demoContainer) {
    throw new Error('Could not fetch demo container on template page');
  }

  const res = await fetch('https://hacks-in-ts-ae00034f9e8a6fd53d30a742748.webflow.io/components');
  if (res.ok) {
    const html = await res.text();
    const parser = new DOMParser();
    // Insert the HTML code into the page
    const doc = parser.parseFromString(html, 'text/html');
    // Get the demo component
    const demoComponent = doc.querySelector(`[fs-component-name="${hackName}"]`);
    if (!demoComponent) {
      throw new Error('Could not fetch demo component from components page');
    }
    demoContainer.prepend(demoComponent);
  } else {
    throw new Error('Could not fetch demo component');
  }
};

export const fetchTsCode = async () => {
  if (!hackName) {
    throw new Error('Error retrieving hack name');
  }
  try {
    const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.ts`;
    const code = (await fetchCode(url)) as Code;
    const { formattedCode } = code;
    const tsWrapper = document.querySelector('[fs-element="ts_wrapper"]') as HTMLElement;
    if (!tsWrapper) {
      throw new Error('Error selecting TS wrapper');
    }
    tsWrapper.innerHTML = formattedCode;
  } catch (error) {
    console.error(error);
  }
};

export const fetchJsCode = async () => {
  try {
    const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.js`;
    const code = (await fetchCode(url)) as Code;
    const { formattedCode } = code;
    const { unformattedCode } = code;
    const jsWrapper = document.querySelector('[fs-element="js_wrapper"]') as HTMLElement;
    if (!jsWrapper) {
      throw new Error('Error selecting JS wrapper');
    }
    jsWrapper.innerHTML = formattedCode;
    return unformattedCode;
  } catch (error) {
    console.error(error);
  }
};

const fetchComponentJSON = async () => {
  if (!hackName) {
    throw new Error('Error retrieving hack name');
  }
  // !! TO DO: dynamically fetch the latest commit version, i.e. text after the @
  const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@e497915603641fbca41c80a50666b1023dd8056d/src/webflow-hacks/${hackName}/${hackName}.json`;
  try {
    const componentJSON = await fetch(url);
    return componentJSON.json();
  } catch (error) {
    console.error(error);
  }
};

export const copyComponentJSON = async () => {
  const copyData = await fetchComponentJSON();
  if (!copyComponentButton) {
    throw new Error('Could not select component copy button');
  }
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
      const activeTab = document.querySelector('.w--tab-active');
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
