'use strict';
// inject the youtube api script
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.insertAdjacentElement('afterbegin', tag);
/**
 * default function called by the youtube api
 */
function onYouTubeIframeAPIReady() {
  const IFRAME_SELECTOR = '[fs-hacks-element="iframe"]';
  const iFrameContainer = document.querySelector(IFRAME_SELECTOR);
  if (!iFrameContainer) return;
  const iFrames = iFrameContainer.querySelectorAll('iframe');
  iFrames.forEach((iFrame) => {
    // set iframe properties
    const { src } = iFrame;
    if (!src) return;
    const newSrc = new URL(src);
    if (!newSrc.origin.includes('youtube')) return;
    newSrc.searchParams.append('enablejsapi', '1');
    iFrame.src = newSrc.toString();
    createPlayer(iFrame);
  });
}
/**
 * Set up the player, add listeners, and play the video.
 * @param iframe The iframe
 */
function createPlayer(iframe) {
  // initialize YT.player object
  const player = new YT.Player(iframe, {
    events: {
      onReady: onPlayerReady,
    },
  });
  function onPlayerReady() {
    const TIMESTAMP_CONTAINER_SELECTOR = '[fs-hacks-element="timestamps-container"]';
    const TIMESTAMP_LINK_SELECTOR = '[fs-hacks-element="timestamp"]';
    const container = iframe.closest(TIMESTAMP_CONTAINER_SELECTOR);
    if (!container) return;
    const timestampLinks = container.querySelectorAll(TIMESTAMP_LINK_SELECTOR);
    timestampLinks.forEach((timestampLink) => {
      const timestamp = timestampLink.innerText.trim();
      const seconds = convertTimestampToSeconds(timestamp);
      if (isNaN(seconds)) return;
      timestampLink.addEventListener('click', function (e) {
        e.preventDefault();
        player.seekTo(seconds, true);
      });
    });
  }
}
/**
 * Convert timestamp to seconds
 * @param timestamp
 * @returns {number}
 */
const convertTimestampToSeconds = (timestamp) => {
  const timeStampNumbers = timestamp.split(':').map(Number);
  return timeStampNumbers.reduce((acc, time) => 60 * acc + time);
};
