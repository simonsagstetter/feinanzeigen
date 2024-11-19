'use strict';

import * as cheerio from 'cheerio';

const DEFAULT_ADS = {
  tableAds: {
    sel: '#srchrslt-adtable',
    type: 0,
    isCompleted: false,
  },
  leftbaseAds: {
    sel: '.site-base--left-banner',
    type: 1,
    isCompleted: false,
  },
  rightbaseAds: {
    sel: '.site-base--right-banner',
    type: 1,
    isCompleted: false,
  },
  bannerAds: {
    sel: '#brws_banner-supersize',
    type: 1,
    isCompleted: false,
  },
  topAds: {
    sel: '#srp_adsense-top',
    type: 1,
    isCompleted: false,
  },
  middleAds: {
    sel: '#srps-middle',
    type: 1,
    isCompleted: false,
  },
  footerAds: {
    sel: '#btf-billboard',
    type: 1,
    isCompleted: false,
  },
};

/**
 * Checks if all ads are marked as completed.
 * @param {Object} ads - The ads object containing ad details.
 * @returns {boolean} - Returns true if all ads are completed, otherwise false.
 */
function isCompleted(ads) {
  return Object.values(ads).every((ad) => ad.isCompleted);
}

/**
 * Applies CSS styles to a target element.
 * @param {HTMLElement} targetElement - The element to apply styles to.
 * @param {Object} stylesObject - An object containing CSS properties and values.
 */
function applyCss(targetElement, stylesObject) {
  Object.entries(stylesObject).forEach(([key, value]) => {
    targetElement.style[key] = value;
  });
}

/**
 * Sets CSS styles for a single element selected by a CSS selector.
 * @param {string|HTMLElement} selector - The CSS selector or element to apply styles to.
 * @param {Object} stylesObject - An object containing CSS properties and values.
 */
function setCss(selector, stylesObject) {
  const targetElement =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  applyCss(targetElement, stylesObject);
}

/**
 * Sets CSS styles for multiple elements selected by a CSS selector.
 * @param {string} selector - The CSS selector to select elements.
 * @param {Object} stylesObject - An object containing CSS properties and values.
 */
function setMultipleCss(selector, stylesObject) {
  document
    .querySelectorAll(selector)
    .forEach((elem) => applyCss(elem, stylesObject));
}

/**
 * Creates a new HTML element with specified attributes and inner text.
 * @param {Object} options - Options for creating the element.
 * @param {string} [options.tag='div'] - The tag name of the element.
 * @param {Object} [options.attributes={}] - Attributes to set on the element.
 * @param {string} [options.innerText] - Inner text of the element.
 * @returns {HTMLElement} - The created HTML element.
 */
function createElement({
  tag = 'div',
  attributes = {},
  innerText = undefined,
}) {
  const elem = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) =>
    elem.setAttribute(key, value)
  );

  if (innerText) {
    elem.innerText = innerText;
  }

  return elem;
}

/**
 * Creates a loading element with an SVG image and a message.
 * @returns {Promise<HTMLElement>} - A promise that resolves to the loading element.
 */
async function createLoadingElement() {
  document.body.style.overflowY = 'hidden';
  const divElem = createElement({ attributes: { id: 'fa-loading' } });
  const innerDivElem = createElement({});
  const pElem = createElement({
    tag: 'p',
    attributes: { id: 'fa-loading-text' },
    innerText: 'Einen Moment Geduld, ich räum das mal auf...',
  });

  return fetch(chrome.runtime.getURL('ka.svg'))
    .then((response) => response.text())
    .then((svgContent) => {
      const parser = new DOMParser();
      const svg = parser.parseFromString(
        svgContent,
        'image/svg+xml'
      ).documentElement;

      svg.setAttribute('id', 'fa-loading-image');
      innerDivElem.insertAdjacentElement('afterbegin', svg);
      divElem.appendChild(innerDivElem);
      divElem.appendChild(pElem);
      return divElem;
    });
}

/**
 * Creates a "Load More" button for loading additional content.
 * @param {string} link - The URL to fetch additional content from.
 * @param {HTMLElement} target - The target element to insert the content into.
 * @returns {HTMLElement} - The created button element.
 */
function createLoadMoreButton(link, target) {
  const divElem = createElement({
    attributes: { id: 'fa-ad-load-desc-wrapper' },
  });
  const btn = createElement({
    tag: 'button',
    attributes: { id: 'fa-ad-load-desc-btn' },
    innerText: 'Gesamte Beschreibung abrufen',
  });
  btn.addEventListener('click', function () {
    this.innerText = 'Beschreibung wird geladen...';
    fetch(link)
      .then((res) => res.text())
      .then((htmlText) => {
        const $ = cheerio.load(htmlText);
        const description = $('#viewad-description-text');
        target.querySelector('.aditem-main--middle--description').innerHTML =
          '';
        target
          .querySelector('.aditem-main--middle--description')
          .insertAdjacentHTML('afterbegin', description);

        this.style.display = 'none';
      });
  });
  divElem.appendChild(btn);
  return divElem;
}

/**
 * Initializes the ad removal and CSS adjustment process.
 */
function init() {
  const ads = { ...DEFAULT_ADS };
  do {
    Object.entries(ads).forEach(([key, ad]) => {
      const isRemoved =
        ad.type === 0
          ? removeAdWithinList(
              ad.sel,
              (ad) => ad.firstElementChild.tagName !== 'ARTICLE'
            )
          : removeAd(ad.sel);
      ads[key] = {
        ...ad,
        isCompleted: isRemoved,
      };
    });
    setTimeout(() => {}, 1000);
  } while (!isCompleted(ads));

  if (isCompleted(ads)) {
    adjustCss();
    setTimeout(() => {
      document.body.style.overflowY = 'auto';
      document.querySelector('#fa-loading').style.display = 'none';
    }, 2000);
  }
}

/**
 * Adjusts CSS styles for various elements on the page.
 */
function adjustCss() {
  setCss('.site-base', {
    display: 'flex',
    justifyContent: 'center',
  });
  setCss('.site-base--content', { width: '100%' });
  setCss('#site-content', {
    width: '100%',
    padding: '3rem',
  });
  setCss('.srp-header', {
    marginBottom: '2rem',
    boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
    border: '1px solid #dddbd5',
  });

  setCss('.browsebox', {
    border: '1px solid #dddbd5',
    boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
  });

  setMultipleCss('.l-splitpage-flex', {
    justifyContent: 'space-between',
    gap: '2rem',
  });

  setCss('#srchrslt-content', { width: '100%' });

  document.querySelectorAll('.ad-listitem').forEach((elem) => {
    const link = elem.firstElementChild.dataset.href;

    setCss(elem, {
      marginBottom: '2rem',
      boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
      position: 'relative',
    });

    setMultipleCss('.ellipsis', {
      fontSize: '1.3rem',
      fontWeight: '500',
    });

    const btn = createLoadMoreButton(link, elem);

    elem.firstElementChild.insertAdjacentElement('beforeend', btn);
  });

  setMultipleCss('.imagebox, .srpimagebox', {
    width: '250px',
    height: '200px',
  });

  setMultipleCss('.aditem-image', {
    flexBasis: '250px',
  });

  setMultipleCss('.aditem-main--top', { fontWeight: '500' });
  setMultipleCss(
    '.aditem-main--middle--price-shipping--price, .aditem-main--middle--price-shipping--old-price',
    {
      fontSize: '20px',
    }
  );
}

/**
 * Removes ads from a list based on a filter function.
 * @param {string} selector - The CSS selector for the list.
 * @param {Function} filterFunc - The filter function to determine which ads to remove.
 * @returns {boolean} - Returns true after attempting to remove ads.
 */
function removeAdWithinList(selector, filterFunc) {
  const list = document.querySelector(selector);
  if (!list) return true;
  try {
    [...list.children].filter(filterFunc).forEach((ad) => ad.remove());
  } catch {
    console.warn(`Could not delete ads from ${selector}`);
  }
  return true;
}

/**
 * Removes an ad element from the DOM.
 * @param {string} selector - The CSS selector for the ad element.
 * @returns {boolean} - Returns true after attempting to remove the ad.
 */
function removeAd(selector) {
  const element = document.querySelector(selector);
  if (!element) return true;
  try {
    element.remove();
  } catch {
    console.warn(`Could not delete ad ${selector}`);
  }
  return true;
}

window.addEventListener('load', () => {
  const path = window.location.pathname;
  if (path.includes('s-') && !path.includes('s-anzeige')) {
    createLoadingElement().then((element) => {
      document
        .querySelector('body')
        .insertAdjacentElement('afterbegin', element);
      init();
    });
  }
});
