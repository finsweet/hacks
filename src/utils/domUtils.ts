/**
 * Replace arrows with html encoded chars
 * @param code string
 * @returns string
 */
export const formatCode = (code: string) => {
  const script = `<script>\n${code}</script>`.replace(/</g, '&lt;');
  return `<pre><code>${script}</pre></code>`;
};

/**
 * Add sript tag to head of document.
 * @param url the src string
 */
export const appendHeadScript = async (url: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  await document.head.appendChild(script);
};
