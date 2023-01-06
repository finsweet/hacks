import { SELECTORS } from '$utils/constants';
import {
  appendHeadScript,
  appendJsCode,
  fetchDemoComponent,
  fetchTsCode,
  fetchJsCode,
  copyComponentJSON,
  copyCode,
  storeUserPreference,
  getUserPreference,
} from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(() => {
  getUserPreference();

  const fetchAllElements = async () => {
    try {
      await Promise.all([
        fetchDemoComponent(),
        fetchTsCode(),
        (async () => {
          const javascript = await fetchJsCode();
          // append js code to make the demo component functional
          appendJsCode(javascript);
        })(),
      ]);

      // highlight code
      appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
      // copy JSON function
      copyComponentJSON();
      // copy JS/TS code function
      copyCode();
      //store user preferences to set JS or TS code as default
      storeUserPreference();
    } catch (error) {
      console.error(error);
    }
  };

  fetchAllElements();
});
