/**
 * Prepare code for display on DOM
 * @param code string
 * @returns string
 */
export const formatCode = (code: string) => {
  code = code.replace(/ /g, '&nbsp;');
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

// utility function to handle the fetching the TS and JS code
export const fetchCode = async (url: string) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      // will be used to append to make the demo component functional
      const unformattedCode = await res.text();
      // will be used to display the code in the hacks page as visible text
      const formattedCode = formatCode(unformattedCode);
      return { unformattedCode, formattedCode };
    }
    throw new Error('Error fetching and/or formatting code');
  } catch (error) {
    console.error(error);
  }
};

// append js code to make the demo component functional
export const appendJsCode = (formattedCode: string) => {
  const script = document.createElement('script');
  script.innerHTML = formattedCode;
  document.body.appendChild(script);
  // Dispatch the DOMContentLoaded event to trigger hack JS
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
};
