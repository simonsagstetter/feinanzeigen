/**
 * Selects DOM elements based on a CSS selector.
 *
 * @param {string} selector - The CSS selector to match elements against.
 * @param {Document|Element} [searchParameter=document] - The root element to start the search from.
 * @param {boolean} [returnNodeList=false] - Whether to return a NodeList instead of a single element.
 * @returns {Element|NodeList} The matched element or NodeList of elements.
 */
export const $ = (
  selector,
  searchParameter = document,
  returnNodeList = false
) => {
  const selectionResult = searchParameter.querySelectorAll(selector);
  return selectionResult.length === 1 && !returnNodeList
    ? selectionResult[0]
    : selectionResult;
};

/**
 * Applies a set of CSS styles to a single DOM element.
 *
 * @param {Element} element - The DOM element to apply styles to.
 * @param {Object} styles - An object where keys are CSS property names and values are CSS values.
 */
export const css = (element, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

/**
 * Applies a set of CSS styles to multiple DOM elements.
 *
 * @param {NodeList|Array<Element>} nodes - A collection of DOM elements to apply styles to.
 * @param {Object} styles - An object where keys are CSS property names and values are CSS values.
 */
export const cssAll = (nodes, styles) => {
  [...nodes].forEach((node) => css(node, styles));
};

/**
 * Sets multiple attributes on a DOM element.
 *
 * @param {Element} element - The DOM element to set attributes on.
 * @param {Object} attributes - An object where keys are attribute names and values are attribute values.
 */
export const setAttr = (element, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};
