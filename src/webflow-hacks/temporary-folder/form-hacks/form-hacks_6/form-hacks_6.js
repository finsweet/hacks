"use strict";
// when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // declare constant selectors
    const FORM_SELECTOR = '[fs-hacks-element="hack29-form"]';
    const NAME_INPUT_SELECTOR = '[fs-hacks-element="hack29-name-input"]';
    const MESSAGE_SELECTOR = '[fs-hacks-element="custom-message"]';
    const form = document.querySelector(FORM_SELECTOR);
    // early return
    if (!form)
        return;
    const nameInput = form.querySelector(NAME_INPUT_SELECTOR);
    const messageDiv = document.querySelector(MESSAGE_SELECTOR);
    if (!nameInput || !messageDiv)
        return;
    // when form is submitted
    nameInput.addEventListener('input', function () {
        const nameValue = nameInput.value;
        if (nameValue && nameValue !== '') {
            messageDiv.innerText = `Thank you, ${nameValue}!`;
        }
        else {
            messageDiv.innerText = 'Thank you! Your submission has been received!';
        }
    });
});
