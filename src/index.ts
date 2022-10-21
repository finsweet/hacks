import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const CODE_LISTING_ATTRIBUTE_URL =
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-codehighlight@1/codehighlight.js';
  const COPY_ATTRIBUTE_URL =
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-copyclip@1/copyclip.js';
  const CODE_LISTING_SELECTOR = '[fs-codehighlight-element]';
  const codeListing = document.querySelector<HTMLDivElement>(CODE_LISTING_SELECTOR);
  if (!codeListing) return;

  const url = codeListing.getAttribute('url');
  if (!url) return;

  const resp = await fetch(url);
  const code = await resp.text();

  eval(code);

  codeListing.innerHTML = formatCode(code);
  appendHeadScript(CODE_LISTING_ATTRIBUTE_URL);
  appendHeadScript(COPY_ATTRIBUTE_URL);
});

const formatCode = (code: string) => {
  const script = `<script>\n${code}</script>`.replace(/</g, '&lt;');
  return `<pre><code>${script}</pre></code>`;
};

const appendHeadScript = (url: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
};
