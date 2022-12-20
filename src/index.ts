import { CopyJSONButton } from '@finsweet/ts-utils';

import { SELECTORS } from '$utils/constants';
import { appendHeadScript, fetchCode, appendJsCode } from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(() => {
  const hackNameElement = document.querySelector('[fs-element="hack_name"]');
  if (!hackNameElement) {
    throw new Error('Error retrieving hack name element');
  }
  const hackName = hackNameElement.innerHTML;
  if (!hackName) {
    throw new Error('Error retrieving hack name');
  }

  const fetchDemoComponent = async () => {
    const demoContainer = document.querySelector('[fs-element="demo_container"]');
    if (!demoContainer) {
      throw new Error('Could not fetch demo container on template page');
    }
    const res = await fetch(
      'https://hacks-in-ts-ae00034f9e8a6fd53d30a742748.webflow.io/components'
    );
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

  type Code = {
    unformattedCode: string;
    formattedCode: string;
  };

  const fetchTsCode = async () => {
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

  const fetchJsCode = async () => {
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

  const fetchAllElements = async () => {
    try {
      await fetchDemoComponent();
      await fetchTsCode();
      const unformattedCode = (await fetchJsCode()) as string;
      appendJsCode(unformattedCode);
      // highlight code
      appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
      copyComponentJSON();
    } catch (error) {
      console.error(error);
    }
  };

  const copyComponentButton = document.querySelector('[fs-copy-component]') as HTMLElement;
  if (!copyComponentButton) {
    throw new Error('Could not select component copy button');
  }
  const fetchComponentJSON = async () => {
    // !! TO DO: dynamically fetch the latest commit version, i.e. text after the @
    const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@e497915603641fbca41c80a50666b1023dd8056d/src/webflow-hacks/${hackName}/${hackName}.json`;
    try {
      const componentJSON = await fetch(url);
      return componentJSON.json();
    } catch (error) {
      console.error(error);
    }
  };

  const copyComponentJSON = async () => {
    const copyData = await fetchComponentJSON();
    const copyComponentButton = document.querySelector('.copy-button_component') as HTMLElement;
    new CopyJSONButton({
      element: copyComponentButton,
      copyData,
    });
  };

  fetchAllElements();
});
