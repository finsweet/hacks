import { SELECTORS } from '$utils/constants';
import { formatCode, appendHeadScript } from '$utils/domUtils';

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

  async function fetchDemoComponent() {
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
  }

  type Code = {
    unformattedCode: string;
    formattedCode: string;
  };
  // utility function to handle the fetching the TS and JS code
  async function fetchCode(url: string) {
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
  }
  async function fetchTsCode() {
    try {
      const url = `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.ts`;
      const code = (await fetchCode(url)) as Code;
      const tsCode = code.formattedCode;
      const tsWrapper = document.querySelector('[fs-element="ts_wrapper"]') as HTMLElement;
      if (!tsWrapper) {
        throw new Error('Error selecting TS wrapper');
      }

      tsWrapper.innerHTML = tsCode;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchJsCode() {
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
  }

  // append js code to make the demo component functional
  const appendJsCode = (formattedCode: string) => {
    const script = document.createElement('script');
    script.innerHTML = formattedCode;
    document.body.appendChild(script);

    // Dispatch the DOMContentLoaded event to trigger hack JS
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  };

  async function fetchAllElements() {
    try {
      await fetchDemoComponent();
      await fetchTsCode();
      const formattedCode = (await fetchJsCode()) as string;
      appendJsCode(formattedCode);
    } catch (error) {
      console.error(error);
    }
  }

  fetchAllElements();
});
appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
