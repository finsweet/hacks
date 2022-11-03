"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const SUCCESS_DIV_SELECTOR = '[fs-hacks-element="success-text"]';
    const successDiv = document.querySelector(SUCCESS_DIV_SELECTOR);
    if (!successDiv)
        return;
    const customSuccessMessage = getCookieValue('successTextCookie');
    successDiv.innerText = "We'll focus on " + customSuccessMessage + " for future F'in sweet Webflow Hacks!";
});
/**
 * Get a cookie by name.
 * @param name The name of the cookie to get.
 * @returns The value of the cookie.
 * @see https://stackoverflow.com/a/25490531/104380
 */
function getCookieValue(name) {
    var _a;
    return ((_a = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')) === null || _a === void 0 ? void 0 : _a.pop()) || '';
}
