import { $, css, cssAll } from './dom';

/**
 * Class representing a layout manager.
 */
export default class Layout {
  /**
   * Create a layout manager.
   * @param {Document} document - The document object to be used for DOM manipulation.
   */
  constructor(document) {
    Object.defineProperties(this, {
      document: {
        value: document,
      },
    });
  }

  /**
   * Adjust the styles of specified targets.
   * @param {Object} targets - The targets to adjust.
   * @param {Array} targets.items - An array of target items.
   * @param {string} targets.items[].sel - The CSS selector for the target elements.
   * @param {boolean} targets.items[].multiple - Whether to apply styles to multiple elements.
   * @param {Object} targets.items[].style - The style object to apply to the target elements.
   */
  adjust(targets) {
    targets.items.forEach(({ sel, multiple, style }) => {
      const nodes = $(sel, this.document);
      if (multiple && nodes instanceof NodeList) {
        cssAll(nodes, style);
      } else {
        css(nodes, style);
      }
    });
  }
}
