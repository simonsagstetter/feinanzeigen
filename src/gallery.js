import { $, css, setAttr } from './dom';
import HTML from './html';

/**
 * Class representing a Gallery.
 */
export default class Gallery {
  /**
   * Create a Gallery.
   * @param {Document} document - The document object.
   */
  constructor(document) {
    Object.defineProperties(this, {
      document: {
        value: document,
      },
      dialog: {
        value: undefined,
        writable: true,
      },
      html: {
        value: new HTML(),
      },
      arrowLeft: {
        value: 'ArrowLeft',
      },
      arrowRight: {
        value: 'ArrowRight',
      },
    });
  }

  /**
   * Mount the gallery dialog to the document.
   */
  mount() {
    const dialog = this.html.renderHTLMElement(
      `<dialog id="fa-dialog">
            <div id="fa-gallery">
            </div>
        </dialog>`
    );

    dialog.addEventListener('keyup', this.navigate.bind(this));

    this.document.body.insertAdjacentElement('afterbegin', dialog);

    this.dialog = dialog;
  }

  /**
   * Open the gallery with the specified HTML and article.
   * @param {Function} html - Function to select HTML elements.
   * @param {HTMLElement} article - The article element to toggle loading state.
   */
  open(html, article) {
    this.toggleLoading(article, true);
    const gallery = html('.galleryimage-large');
    const dialog = $('#fa-dialog', this.document);
    const imageBox = $('#fa-gallery', this.document);
    imageBox.innerHTML = '';
    imageBox.insertAdjacentHTML('afterbegin', gallery.prop('outerHTML'));
    this.prepareGallery(imageBox);
    this.registerEvents(imageBox);
    this.toggleLoading(article, false);
    dialog.showModal();
    dialog.focus();
  }

  /**
   * Toggle the loading state of the gallery.
   * @param {HTMLElement} root - The root element to toggle loading state.
   * @param {boolean} isLoading - Whether the gallery is loading.
   */
  toggleLoading(root, isLoading) {
    css($('#fa-image-loading', root), { display: isLoading ? 'flex' : 'none' });
  }

  /**
   * Prepare the gallery by setting attributes and removing unnecessary elements.
   * @param {HTMLElement} imageBox - The image box element.
   */
  prepareGallery(imageBox) {
    [...$('#viewad-image', imageBox, true)].forEach((node) =>
      setAttr(node, { loading: 'eager' })
    );

    $(
      '[data-liberty-position-name="vip-gallery-carrousel"]',
      imageBox,
      true
    ).forEach((elem) => elem.remove());

    $('.galleryimage--info', imageBox, true).forEach((elem) => elem.remove());
    imageBox.insertAdjacentHTML(
      'afterbegin',
      this.html.render(
        `<form method="dialog">
        <button class="mfp-close" id="fa-gallery-close-btn" />
      </form>`
      )
    );
  }

  /**
   * Change the current image in the gallery.
   * @param {string} direction - The direction to change the image ('next' or 'prev').
   * @param {HTMLElement} imageBox - The image box element.
   */
  changeImage(direction, imageBox) {
    const nodes = $('.galleryimage-element', imageBox, true);
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

  /**
   * Register navigation events for the gallery.
   * @param {HTMLElement} imageBox - The image box element.
   */
  registerEvents(imageBox) {
    const [prev] = $('.galleryimage--navigation--prev', imageBox, true),
      [next] = $('.galleryimage--navigation--next', imageBox, true);
    if (next && prev) {
      prev.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.changeImage('prev', imageBox);
        }.bind(this)
      );
      next.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.changeImage('next', imageBox);
        }.bind(this)
      );
    }
  }

  /**
   * Navigate through the gallery using keyboard keys.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  navigate({ key }) {
    if ('' + key === this.arrowLeft) {
      $('.galleryimage--navigation--prev', this.dialog).click();
    } else if ('' + key === this.arrowRight) {
      $('.galleryimage--navigation--next', this.dialog).click();
    }
  }
}
