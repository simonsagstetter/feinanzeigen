'use strict';

import AdBlocker from './adblocker';
import HTML from './html';
import UI from './ui';
import { $ } from './dom';
import Layout from './layout';
import Gallery from './gallery';
import SearchResults from './searchResults';
import { SEARCH_RESULT_CSS } from './constants';

/**
 * Represents the application state.
 * @type {Object}
 * @property {AdBlocker} adblocker - Manages ad blocking functionality.
 * @property {HTML} html - Handles HTML content generation.
 * @property {UI} ui - Manages UI interactions.
 * @property {Layout} layout - Handles layout adjustments.
 * @property {Gallery} gallery - Manages the gallery component.
 * @property {SearchResults} results - Handles search results processing.
 */
const state = {
  adblocker: new AdBlocker(document, 'ARTICLE'),
  html: new HTML(),
  ui: new UI(document),
  layout: new Layout(document),
  gallery: new Gallery(document),
  results: new SearchResults('#srchrslt-content', document),
};

/**
 * Initializes the application components and sets up event listeners.
 */
function init() {
  state.gallery.mount();
  state.layout.adjust(SEARCH_RESULT_CSS);
  state.results.process();

  /**
   * Event handler for gallery click events.
   * @param {Object} param0 - The event data.
   * @param {HTMLElement} param0.html - The HTML element.
   * @param {HTMLElement} param0.article - The article element.
   * @param {Event} param0.event - The click event.
   */
  state.results.events.on('clickGallery', function ({ html, article, event }) {
    event.preventDefault();
    state.gallery.open(html, article);
  });

  setTimeout(() => {
    state.ui.toggleLoading();
    state.ui.toggleScrollBlocking();
  }, 1000);
}

/**
 * Sets up the application on window load.
 */
window.addEventListener('load', () => {
  const path = window.location.pathname;

  state.adblocker.removeAds();
  state.adblocker.keepObserving();
  $('body').insertAdjacentHTML('afterbegin', state.html.getPageLoader());

  if (path.includes('s-') && !path.includes('s-anzeige')) {
    state.ui.toggleLoading();
    state.ui.toggleScrollBlocking();
    init();
  }
});
