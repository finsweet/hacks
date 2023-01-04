import { SELECTORS } from '$utils/constants';
import {
  appendHeadScript,
  appendJsCode,
  fetchDemoComponent,
  fetchTsCode,
  fetchJsCode,
  copyComponentJSON,
  copyCode,
} from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(() => {
  const fetchAllElements = async () => {
    try {
      await fetchDemoComponent();
      await fetchTsCode();
      const javascript = await fetchJsCode();
      // append js code to make the demo component functional
      appendJsCode(javascript);
      // highlight code
      appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
      // copy JSON function
      copyComponentJSON();
      // copy JS/TS code function
      copyCode();
    } catch (error) {
      console.error(error);
    }
  };

  fetchAllElements();
});
