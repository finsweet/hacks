window.Webflow ||= [];
window.Webflow.push(() => {
  const hackName = document.querySelector('[fs-element="hack_name"]').innerHTML;

  async function fetchTsCode() {
    if (!hackName) return;
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/finsweet/hacks@63328a66ee8745471271deb49fea87106073fff4/src/webflow-hacks/${hackName}/${hackName}.ts`
    );
    if (res.status === 200) {
      const tsCodeString = await res.text();
      console.log(tsCodeString);

      const tsWrapper = document.querySelector('[fs-element="ts_wrapper"]');
      console.log(tsWrapper);
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
    if (res.status === 200) {
      const jsCodeString = await res.text();
      console.log(jsCodeString);

      const jsWrapper = document.querySelector('[fs-element="js_wrapper"]');
      console.log(jsWrapper);
      jsWrapper.setAttribute('style', 'white-space: pre;');
      jsWrapper.innerHTML = jsCodeString;
    } else {
      throw new Error('Error fetching JS code');
    }
  }
  fetchJsCode();
});
