import { SELECTORS } from '$utils/constants';
import { formatCode, appendHeadScript } from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(() => {
  const hackNameElement = document.querySelector('[fs-element="hack_name"]');
  const hackName = hackNameElement?.innerHTML;
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
  async function fetchTsCode() {
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.ts`
    );
    if (res.ok) {
      const tsCode = await res.text();
      const tsWrapper = document.querySelector('[fs-element="ts_wrapper"]');
      if (!tsWrapper) {
        throw new Error('Error selecting TS wrapper');
      }
      const formattedCode = formatCode(tsCode);
      tsWrapper.innerHTML = formattedCode;
    } else {
      throw new Error('Error fetching TS code');
    }
  }
  fetchTsCode();

  async function fetchJsCode() {
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.js`
    );
    if (res.ok) {
      const jsCode = await res.text();
      const jsWrapper = document.querySelector('[fs-element="js_wrapper"]');
      if (!jsWrapper) {
        throw new Error('Error selecting JS wrapper');
      }
      const formattedCode = formatCode(jsCode);
      jsWrapper.innerHTML = formattedCode;
      // wait for demo component to render appending JS code
      await fetchDemoComponent();
      return jsCode;
    }
    {
      throw new Error('Error fetching JS code');
    }
  }

  // append js code to make the demo component functional
  const appendJsCode = (jsCode: string) => {
    const script = document.createElement('script');
    script.innerHTML = jsCode;
    document.body.appendChild(script);

    // Dispatch the DOMContentLoaded event to trigger hack JS
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  };

  fetchJsCode().then(appendJsCode);
});
appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
