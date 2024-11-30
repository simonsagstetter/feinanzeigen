import { DEFAULT_ADS } from './constants';
import { $ } from './dom';

/**
 * Class representing an AdBlocker.
 */
export default class AdBlocker {
  /**
   * Create an AdBlocker.
   * @param {HTMLElement} searchParameter - The DOM element to search within.
   * @param {string} skipTagName - The tag name to skip when filtering ads.
   */
  constructor(searchParameter, skipTagName) {
    Object.defineProperties(this, {
      ads: {
        value: { ...DEFAULT_ADS },
      },
      isCompleted: {
        value: false,
        writable: true,
        enumerable: true,
      },
      searchParameter: {
        value: searchParameter,
      },
      skipTagName: {
        value: skipTagName,
      },
    });
  }

  /**
   * Check if all ads have been removed.
   * @returns {boolean} True if all ads are removed, otherwise false.
   */
  isFinished() {
    return Object.values(this.ads).every((ad) => ad.isCompleted);
  }

  /**
   * Remove all nodes matching the selector that pass the filter function.
   * @param {string} selector - The CSS selector to match nodes.
   * @param {Function} filterFunc - The function to filter nodes.
   * @returns {boolean} True if operation is successful.
   */
  all(selector, filterFunc) {
    const nodes = $(selector, this.searchParameter);
    if (!nodes || nodes.length < 1) return true;
    try {
      [...nodes.children].filter(filterFunc).forEach((node) => node.remove());
    } catch {
      console.warn(`Could not delete ads from ${selector}`);
    }
    return true;
  }

  /**
   * Remove any nodes matching the selector.
   * @param {string} selector - The CSS selector to match nodes.
   * @returns {boolean} True if operation is successful.
   */
  any(selector) {
    const nodes = $(selector, this.searchParameter);
    if (!nodes || nodes.length < 1) return true;
    try {
      if (nodes instanceof NodeList === false) {
        nodes.remove();
      } else {
        [...nodes].forEach((node) => node.remove());
      }
    } catch {
      console.warn(`Could not delete ads from ${selector}`);
    }
    return true;
  }

  /**
   * Remove a single node matching the selector.
   * @param {string} selector - The CSS selector to match the node.
   * @returns {boolean} True if operation is successful.
   */
  once(selector) {
    const node = $(selector, this.searchParameter);
    if (!node || node.length < 1) return true;
    try {
      node.remove();
    } catch {
      console.warn(`Could not delete ad ${selector}`);
    }
    return true;
  }

  /**
   * Remove ads based on type and selector.
   * @param {Object} ad - The ad object containing type and selector.
   * @param {number} ad.type - The type of removal (0 for all, 1 for once, 2 for any).
   * @param {string} ad.sel - The CSS selector for the ad.
   * @returns {boolean} True if operation is successful.
   */
  removeAd({ type, sel }) {
    return type === 0
      ? this.all(
          sel,
          ({ firstElementChild }) =>
            firstElementChild.tagName !== this.skipTagName
        )
      : type === 2
      ? this.any(sel)
      : this.once(sel);
  }

  /**
   * Remove all ads defined in the ads object.
   * @returns {boolean} True when all ads are removed.
   */
  removeAds() {
    do {
      Object.entries(this.ads).forEach(([key, ad]) => {
        this.ads[key] = {
          ...ad,
          isCompleted: this.removeAd(ad),
        };
      });
    } while (!this.isFinished());

    this.isCompleted = true;
    return this.isCompleted;
  }

  /**
   * Observe DOM mutations and remove nodes with specific attributes.
   */
  keepObserving() {
    new MutationObserver((mutations) => {
      for (const { type, target, attributeName } of mutations) {
        if (type === 'attributes') {
          console.log(`Removed node with attribute ${attributeName}`);
          target.remove();
        }
      }
    }).observe(this.searchParameter, {
      attributes: true,
      attributeFilter: [
        'data-liberty-position-name',
        'data-liberty-is-viewable',
      ],
    });
  }
}
