import { css } from './dom';
import { $ } from './dom';

/**
 * Class representing a UI component.
 */
export default class UI {
  /**
   * Create a UI instance.
   * @param {Document} document - The document object to manipulate.
   */
  constructor(document) {
    Object.defineProperties(this, {
      document: {
        value: document,
      },
      /**
       * @property {boolean} isBocked - Indicates if scrolling is blocked.
       */
      isBocked: {
        value: false,
        writable: true,
        enumerable: true,
      },
      /**
       * @property {boolean} isLoading - Indicates if loading is active.
       */
      isLoading: {
        value: false,
        writable: true,
        enumerable: true,
      },
    });
  }

  /**
   * Toggles the scroll blocking state of the document body.
   */
  toggleScrollBlocking() {
    const prevIsBlocked = this.isBocked;
    const overflowY = prevIsBlocked ? 'auto' : 'hidden';
    css(this.document.body, { overflowY });
    this.isBocked = !prevIsBlocked;
  }

  /**
   * Toggles the loading display state of the loading element.
   */
  toggleLoading() {
    const prevIsLoading = this.isLoading;
    const display = prevIsLoading ? 'none' : 'flex';
    css($('#fa-loading', this.document), { display });
    this.isLoading = !prevIsLoading;
  }
}
