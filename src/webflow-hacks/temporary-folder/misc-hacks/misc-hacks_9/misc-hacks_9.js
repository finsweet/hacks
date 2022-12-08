'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const UL_SELECTOR = '[fs-hacks-element="unordered-list"]';
  const OL_SELECTOR = '[fs-hacks-element="ordered-list"]';
  const originalUnorderedList = document.querySelector(UL_SELECTOR);
  const originalOrderedList = document.querySelector(OL_SELECTOR);
  if (originalUnorderedList) {
    const newUnorderedList = document.createElement('ul');
    const listItems = originalUnorderedList.querySelectorAll('li');
    for (const item of listItems) {
      const tildeCount = (item.innerText.match(/~/g) || []).length;
      const cleanedList = cleanListItem(item);
      const wrappedList = wrapUnorderedList(cleanedList, tildeCount);
      newUnorderedList.appendChild(wrappedList);
    }
    originalUnorderedList.replaceChildren(...newUnorderedList.childNodes);
  }
  if (originalOrderedList) {
    const orderedListItems = originalOrderedList.querySelectorAll('li');
    let newHtml = '';
    for (const item of orderedListItems) {
      let lines = item.innerText.split('\n');
      // remove empty lines
      lines = lines.filter((line) => line.trim().length > 0);
      newHtml += wrapOrderedList(lines);
    }
    originalOrderedList.innerHTML = newHtml;
  }
});
/**
 * Remove the tilde from the list item
 * @param {HTMLElement} li item
 **/
function cleanListItem(li) {
  li.innerText = li.innerText.replace(/~+/g, '');
  return li;
}
/**
 * Wrap the list item in a <ul> tag, given the number of tildes
 * @param {HTMLElement} li item
 * @param {number} tildeCount number of tildes
 **/
function wrapUnorderedList(li, tildeCount) {
  if (tildeCount === 0) return li;
  const uList = document.createElement('ul');
  uList.appendChild(li);
  return wrapUnorderedList(uList, tildeCount - 1);
}
/**
 * Wrap the list item in a <ol> tag, given the numbered list item
 * @param {string[]} lines an array of strings
 * @returns {string} html
 **/
function wrapOrderedList(lines) {
  let buildString = '';
  let previousNestingLevel = 0;
  let numOpenTags = 0;
  for (let line of lines) {
    // matches a number followed by a dot.
    const regex = /(\d+\.)+/;
    const matches = line.trim().match(regex);
    const firstmatch = matches ? matches[0] : '';
    const currentNestingLevel = firstmatch.split('.').length - 1;
    line = '<li>' + line.replace(firstmatch, '') + '</li>';
    if (previousNestingLevel === currentNestingLevel) {
      buildString += line;
    }
    if (previousNestingLevel < currentNestingLevel) {
      previousNestingLevel = currentNestingLevel;
      numOpenTags += 1;
      buildString += '<ol>' + line;
    }
  }
  buildString += '</ol>'.repeat(numOpenTags);
  return buildString;
}
