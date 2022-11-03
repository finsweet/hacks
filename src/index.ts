import { SELECTORS } from '$utils/constants';
import { formatCode, appendHeadScript } from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const codeListings = document.querySelectorAll<HTMLDivElement>(SELECTORS.CODE_LISTING);

  await Promise.all(
    [...codeListings].map(async (codeListing) => {
      const url = codeListing.getAttribute('url');
      const codeType = codeListing.getAttribute('code-type');
      const copyTrigger = codeListing.parentElement?.querySelector<HTMLAnchorElement>(
        '[fs-copyclip-element="click"]'
      );
      if (!url || !codeType || !copyTrigger) return;

      const resp = await fetch(url);
      const code = await resp.text();

      copyTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        const textDiv = copyTrigger.lastChild as HTMLDivElement;
        if (!textDiv) return;

        const previousText = textDiv.innerText;
        textDiv.innerText = 'Copied!';

        setTimeout(() => {
          textDiv.innerText = previousText;
        }, 2000);

        navigator.clipboard.writeText(code);
      });

      codeListing.innerHTML = formatCode(code);
    })
  );

  appendHeadScript(SELECTORS.CODE_HIGHLIGHT_ATTR_URL);
});
