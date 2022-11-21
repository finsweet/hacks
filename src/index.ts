import { SELECTORS } from '$utils/constants';
import { formatCode, appendHeadScript } from '$utils/domUtils';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const codeListings = document.querySelectorAll<HTMLDivElement>(SELECTORS.CODE_LISTING);
  const componentCopyButtons = document.querySelectorAll<HTMLAnchorElement>(
    `[${SELECTORS.COPY_COMPONENT}]`
  );

  componentCopyButtons.forEach(async (componentCopyButton) => {
    componentCopyButton.addEventListener('click', async () => {
      const url = componentCopyButton.getAttribute(SELECTORS.COPY_COMPONENT);
      if (!url) return;

      const resp = await fetch(url);
      const wfJson = await resp.json();

      try {
        document.addEventListener('copy', (e) => {
          copyButtonClicked(e, wfJson);
        });
        document.execCommand('copy');
      } catch (e) {
      } finally {
        document.removeEventListener('copy', (e) => {
          copyButtonClicked(e, wfJson);
        });
      }

      const textDiv = componentCopyButton.lastChild as HTMLDivElement;
      const previousText = textDiv.innerText;
      textDiv.innerText = 'Copied!';

      setTimeout(() => {
        textDiv.innerText = previousText;
      }, 2000);
    });
  });

  await Promise.all(
    [...codeListings].map(async (codeListing) => {
      const url = codeListing.getAttribute('url');
      const copyTrigger = codeListing.parentElement?.querySelector<HTMLAnchorElement>(
        '[fs-copyclip-element="click"]'
      );
      if (!url || !copyTrigger) return;

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

const copyButtonClicked = (event: ClipboardEvent, wfJson: JSON) => {
  event.clipboardData?.setData('application/json', JSON.stringify(wfJson));
  event.preventDefault();
};
