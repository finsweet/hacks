import { SELECTORS } from '$utils/constants';
import { formatCode, appendHeadScript } from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(() => {
  const hackNameElement = document.querySelector('[fs-element="hack_name"]');
  const hackName = hackNameElement?.innerHTML;
  if (!hackName) {
    throw new Error('Error retrieving hack name');
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
    } else {
      throw new Error('Error fetching JS code');
    }
  }
  fetchJsCode();
});
appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
