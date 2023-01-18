export const SELECTORS = {
  CODE_HIGHLIGHT_ATTR_URL:
    'https://cdn.jsdelivr.net/npm/@finsweet/attributes-codehighlight@1/codehighlight.js',
  CODE_LISTING: '[fs-codehighlight-element]',
  COPY_COMPONENT: 'fs-copy-component',
};

export const copyComponentButton = document.querySelector('[fs-copy-component]') as HTMLElement;

const hackNameElement = document.querySelector('[fs-div-element="hack_name"]') as HTMLElement;
export const hackName = hackNameElement.innerHTML;
