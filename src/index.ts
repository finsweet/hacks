import { restartWebflow } from '@finsweet/ts-utils';

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
  setActiveTab,
  displayCodeWrapper,
  displayDemoWrapper,
} from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Script loads!');
  // set default JS/TS tab according to user preference
  const fetchAllElements = async () => {
    try {
      // await before promise prevents highlight code function from running improperly
      await Promise.all([
        // await inside the promise prevents some functions to run before the DOM is ready
        await fetchDemoComponent(),
        await fetchTsCode(),
        (async () => {
          const javascript = await fetchJsCode();
          // append js code to make the demo component functional
          appendJsCode(javascript);
        })(),
        // restart webflow to process appended forms (only needed for hacks with forms)
        restartWebflow(),
      ]);
      setActiveTab();
      // copy JSON function
      copyComponentJSON();
      // copy JS/TS code function
      copyCode();
      // highlight code
      appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);

      // display demo container after demo component was fetched
      displayDemoWrapper();
      // display code wrapper after preference was retrieved
      displayCodeWrapper();
      //store user preferences to set JS or TS code as default

      storeUserPreference();
    } catch (error) {
      console.error(error);
    }
  };

  fetchAllElements();
});
