'use strict';

import AdBlocker from './adblocker';
import HTML from './html';
import UI from './ui';
import { $ } from './dom';
import Layout from './layout';
import Gallery from './gallery';
import SearchResults from './searchResults';
import {
  AD_ITEM_CSS,
  PROFILE_RESULT_CSS,
  SEARCH_RESULT_CSS,
  START_PAGE_CSS,
} from './constants';

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
  results: undefined,
};

/**
 * Initializes the application components and sets up event listeners.
 * @param {Object} params - The initialization parameters.
 * @param {string|null} params.content - The content selector or null.
 * @param {Array<string>} params.lists - The list of selectors for processing.
 * @param {string} params.css - The CSS class to apply for layout adjustments.
 */
function init({ content, lists, css }) {
  state.results = new SearchResults(content, document);
  state.gallery.mount();
  state.layout.adjust(css);
  state.results.process(lists).then(() => {
    /**
     * Event handler for gallery click events.
     * @param {Object} param0 - The event data.
     * @param {HTMLElement} param0.html - The HTML element.
     * @param {HTMLElement} param0.article - The article element.
     * @param {Event} param0.event - The click event.
     */
    state.results.events.on(
      'clickGallery',
      function ({ html, article, event }) {
        event.preventDefault();
        state.gallery.open(html, article);
      }
    );

    setTimeout(() => {
      state.ui.toggleLoading();
      state.ui.toggleScrollBlocking();
    }, 400);
  });
}

/**
 * Sets up the application on window load.
 * Initializes components based on the current URL path.
 */
window.addEventListener('load', () => {
  const path = window.location.pathname;

  state.adblocker.removeAds();
  state.adblocker.keepObserving();
  $('body').insertAdjacentHTML('afterbegin', state.html.getPageLoader());
  $('body').insertAdjacentHTML('beforeend', state.html.getScrollToTop());
  state.ui.toggleScrollTop();

  if (
    path.includes('s-') &&
    !path.includes('s-anzeige') &&
    !path.includes('s-bestandsliste')
  ) {
    state.ui.toggleLoading();
    state.ui.toggleScrollBlocking();
    init({
      content: '#srchrslt-content',
      lists: ['#srchrslt-adtable, #srchrslt-adtable-altads'],
      css: SEARCH_RESULT_CSS,
    });
  } else if (path.includes('s-bestandsliste')) {
    state.ui.toggleLoading();
    state.ui.toggleScrollBlocking();
    init({
      content: null,
      lists: ['#page-searchresults-adtable'],
      css: PROFILE_RESULT_CSS,
    });
  } else if (path.includes('s-anzeige')) {
    state.ui.toggleLoading();
    state.ui.toggleScrollBlocking();
    state.layout.adjust(AD_ITEM_CSS);
    init({
      content: '#site-content',
      lists: ['.ad-list'],
      css: PROFILE_RESULT_CSS,
    });
  } else if (path === '/') {
    state.layout.adjust(START_PAGE_CSS);
  }
});
