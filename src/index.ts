window.Webflow ||= [];
window.Webflow.push(() => {
  const hackNameElement = document.querySelector('[fs-element="hack_name"]');
  const hackName = hackNameElement?.innerHTML;

  if (!hackName) return;
  async function fetchTsCode() {
    if (!hackNameElement) return;
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.ts`
    );
    if (res.ok) {
      const tsCodeString = await res.text();

      const tsWrapper = document.querySelector('[fs-element="ts_wrapper"]');
      if (!tsWrapper) {
        throw new Error('Error selecting TS wrapper');
      }
      tsWrapper.setAttribute('style', 'white-space: pre;');
      tsWrapper.innerHTML = tsCodeString;
    } else {
      throw new Error('Error fetching TS code');
    }
  }

  fetchTsCode();
  async function fetchJsCode() {
    if (!hackName) return;
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.js`
    );
    if (res.ok) {
      const jsCodeString = await res.text();
      const jsWrapper = document.querySelector('[fs-element="js_wrapper"]');
      if (!jsWrapper) {
        throw new Error('Error selecting TS wrapper');
      }
      jsWrapper.setAttribute('style', 'white-space: pre;');
      jsWrapper.innerHTML = jsCodeString;
    } else {
      throw new Error('Error fetching JS code');
    }
  }
  fetchJsCode();
});
