'use strict';

import { load } from 'cheerio';
import { Liquid } from 'liquidjs';

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

const TEMP_ENGINE = new Liquid();
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

function setAttr(target, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    target.setAttribute(key, value);
  });
}

function setAttrs(selector, attributes) {
  const nodeList =
    typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : selector;

  nodeList.forEach((elem) => setAttr(elem, attributes));
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
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.innerText = 'Beschreibung wird geladen...';
    fetch(link)
      .then((res) => res.text())
      .then((htmlText) => {
        const $ = load(htmlText);
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
    if (elem.firstElementChild.tagName !== 'ARTICLE') return;
    const link = elem.firstElementChild.dataset.href;
    const loadingElem = getImageLoader();

    elem
      .querySelector('.aditem-image')
      .lastElementChild.insertAdjacentHTML('beforeend', loadingElem);

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
    elem.querySelector('.aditem-image').lastElementChild.style.position =
      'relative';
    elem.querySelector('.aditem-image').lastElementChild.href =
      'javascript:void(0)';

    elem
      .querySelector('.aditem-image')
      .addEventListener('click', function (event) {
        event.preventDefault();
        elem.querySelector('#fa-image-loading').style.display = 'flex';
        fetch(link)
          .then((response) => response.text())
          .then((htmlText) => {
            const $ = load(htmlText);
            const gallery = $('.galleryimage-large');
            const imageBox = document.querySelector('#fa-gallery');
            imageBox.innerHTML = '';
            imageBox.insertAdjacentHTML(
              'afterbegin',
              gallery.prop('outerHTML')
            );
            prepareGallery(imageBox);
            registerEvents(imageBox);
            elem.querySelector('#fa-image-loading').style.display = 'none';
            document.querySelector('#fa-dialog').showModal();
            document.querySelector('#fa-dialog').focus();
          });
      });
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

function getImageLoader() {
  return TEMP_ENGINE.parseAndRenderSync(
    `<div id="fa-image-loading">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="12.698 21.898 120.779 135.497" width="120.779px" height="135.497px" id="fa-image-loading-image"><defs><bx:export><bx:file format="svg" path="Unbetitelt.svg"></bx:file></bx:export></defs><path fill="#1D4B00" d="M 101.15 154.229 C 83.59 154.229 75 141.974 73.256 139.442 C 68.073 144.543 60.249 154.229 46.156 154.229 C 29.881 154.229 16.161 141.929 16.161 121.987 L 16.161 55.488 C 16.161 35.501 29.903 23.247 46.155 23.247 C 62.408 23.247 76.149 36.262 76.149 55.185 C 79.36 54.046 82.743 53.467 86.15 53.472 C 102.894 53.472 116.144 67.199 116.144 83.698 C 116.144 88.323 115.27 92.437 113.359 96.378 C 123.977 101.135 131.143 111.84 131.143 124.003 C 131.143 140.67 117.686 154.229 101.15 154.229 Z M 80.508 132.135 C 84.821 139.687 92.081 144.153 101.15 144.153 C 112.174 144.153 121.147 135.111 121.147 124.003 C 121.147 115.215 115.54 107.568 107.473 104.877 L 80.507 132.139 L 80.507 132.135 L 80.508 132.135 Z M 46.159 33.322 C 36.207 33.322 26.161 40.176 26.161 55.488 L 26.161 121.988 C 26.161 137.299 36.203 144.153 46.159 144.153 C 54.059 144.153 58.427 140.135 65.471 133.036 L 68.591 129.892 C 66.981 125.059 66.151 119.695 66.151 113.923 L 66.151 55.483 C 66.151 40.172 56.111 33.317 46.154 33.317 L 46.159 33.322 Z M 76.153 66.238 L 76.153 113.928 C 76.153 116.628 76.378 119.197 76.806 121.616 L 98.539 99.716 C 104.853 93.356 106.147 88.713 106.147 83.702 C 106.147 72.997 97.61 63.552 86.149 63.552 C 82.584 63.552 79.173 64.476 76.153 66.243 L 76.153 66.238 Z"></path></svg>
    </div>`
  );
}

function prepareGallery(imageBox) {
  setAttrs(imageBox.querySelectorAll('#viewad-image'), { loading: 'eager' });

  imageBox
    .querySelectorAll('[data-liberty-position-name="vip-gallery-carrousel"]')
    .forEach((elem) => elem.remove());
  imageBox
    .querySelectorAll('.galleryimage--info')
    .forEach((elem) => elem.remove());

  const formElem = createElement({
    tag: 'form',
    attributes: { method: 'dialog' },
  });

  const closeElem = createElement({
    tag: 'button',
    attributes: {
      class: 'mfp-close',
      id: 'fa-gallery-close-btn',
    },
  });
  formElem.appendChild(closeElem);
  imageBox.appendChild(formElem);
}

function registerEvents(imageBox) {
  try {
    imageBox
      .querySelector('.galleryimage--navigation--prev')
      .addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        changeImage('prev', imageBox);
      });
    imageBox
      .querySelector('.galleryimage--navigation--next')
      .addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        changeImage('next', imageBox);
      });
  } catch {}
}

function changeImage(direction, imageBox) {
  const nodes = imageBox.querySelectorAll('.galleryimage-element');
  const nodeArray = Array.isArray(nodes) ? nodes : Array.from(nodes);

  const currentIndex = nodeArray.findIndex((node) =>
    node.classList.contains('current')
  );

  if (currentIndex !== -1) {
    nodeArray[currentIndex].classList.remove('current');
  }

  let newIndex;

  if (direction === 'next') {
    newIndex = (currentIndex + 1) % nodeArray.length;
  } else {
    newIndex = (currentIndex - 1 + nodeArray.length) % nodeArray.length;
  }

  nodeArray[newIndex].classList.add('current');
}

function arrowNavigation(event) {
  if (event.key === 'ArrowLeft') {
    document.querySelector('.galleryimage--navigation--prev').click();
  }

  if (event.key === 'ArrowRight') {
    document.querySelector('.galleryimage--navigation--next').click();
  }
}

function addGallery() {
  const dialog = createElement({
    tag: 'dialog',
    attributes: {
      id: 'fa-dialog',
    },
  });

  dialog.addEventListener('keyup', arrowNavigation);

  const gallery = createElement({ attributes: { id: 'fa-gallery' } });
  dialog.appendChild(gallery);
  document.querySelector('body').insertAdjacentElement('afterbegin', dialog);
}

window.addEventListener('load', () => {
  const path = window.location.pathname;
  if (path.includes('s-') && !path.includes('s-anzeige')) {
    createLoadingElement().then((element) => {
      document
        .querySelector('body')
        .insertAdjacentElement('afterbegin', element);
      addGallery();
      init();
    });
  }
});
