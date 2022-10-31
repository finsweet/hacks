import { cloneNode } from '@finsweet/ts-utils';

import { SELECTORS } from '$utils/constants';
import { formatCode, appendHeadScript } from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const codeListings = document.querySelectorAll<HTMLDivElement>(SELECTORS.CODE_LISTING);

  codeListings.forEach(async (codeListing) => {
    const url = codeListing.getAttribute('url');
    const codeType = codeListing.getAttribute('code-type');
    const copyTrigger = codeListing.parentElement?.querySelector<HTMLAnchorElement>(
      '[fs-copyclip-element="click"]'
    );
    if (!url || !codeType || !copyTrigger) return;

    const resp = await fetch(url);
    const code = await resp.text();

    if (codeType === 'js') eval(code);

    copyTrigger.addEventListener('click', () => {
      const previousButton = cloneNode(copyTrigger);

      copyTrigger.innerText = 'Copied!';
      setTimeout(() => {
        copyTrigger.replaceWith(previousButton);
      }, 2000);

      navigator.clipboard.writeText(code);
    });

    codeListing.innerHTML = formatCode(code);

    appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
  });
});
