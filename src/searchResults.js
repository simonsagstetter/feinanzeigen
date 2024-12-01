import { $, css, setAttr } from './dom';
import { load } from 'cheerio';
import HTML from './html';
import EventEmitter from 'eventemitter3';

/**
 * Class representing search results processing.
 */
export default class SearchResults {
  /**
   * Create a SearchResults instance.
   * @param {string} container - The container selector for search results.
   * @param {string} searchParameter - The search parameter to filter results.
   */
  constructor(container, searchParameter) {
    Object.defineProperties(this, {
      container: {
        value: $(container, searchParameter),
      },
      html: {
        value: new HTML(),
      },
    });
    this.events = new EventEmitter();
    this.addStylings = this.addStylings.bind(this);
    this.addFeatures = this.addFeatures.bind(this);
    this.addDescrptionButton = this.addDescrptionButton.bind(this);
    this.getWatchListStatus = this.getWatchListStatus.bind(this);
  }

  /**
   * Process the search results by applying styles and features.
   */
  async process() {
    const nodeSelector = $(
      '#srchrslt-adtable, #srchrslt-adtable-altads',
      this.container
    );

    const adItems =
      nodeSelector instanceof NodeList
        ? [...nodeSelector].map((node) => [...node.children]).flat()
        : [...nodeSelector.children];

    if (adItems.length > 0) {
      adItems
        .filter((adItem) => adItem.firstElementChild.tagName === 'ARTICLE')
        .map(this.addStylings)
        .map(this.addFeatures);

      return await Promise.all(adItems);
    }
    return undefined;
  }

  /**
   * Fetch and parse the DOM of an ad detail page.
   * @param {string} link - The URL of the ad detail page.
   * @returns {Promise<CheerioStatic|undefined>} The parsed HTML of the ad detail page or undefined if fetch fails.
   */
  async getAdDetailDOM(link) {
    try {
      const response = await fetch(link);
      const htmlText = await response.text();
      return load(htmlText);
    } catch {
      console.error('Could not fetch ad: ', link);
      return undefined;
    }
  }

  /**
   * Apply styling to an ad item.
   * @param {HTMLElement} adItem - The ad item element.
   * @returns {HTMLElement} The styled ad item element.
   */
  addStylings(adItem) {
    css(adItem, {
      marginBottom: '2rem',
      boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
      position: 'relative',
    });

    css($('.ellipsis', adItem), {
      fontSize: '1.3rem',
      fontWeight: '500',
    });

    const imgAnchorElement = $('.aditem-image > a', adItem);
    css(imgAnchorElement, { position: 'relative' });
    setAttr(imgAnchorElement, { href: 'javascript:void(0)' });
    return adItem;
  }

  /**
   * Add features to an ad item, such as description button and watchlist status.
   * @param {HTMLElement} adItem - The ad item element.
   * @returns {HTMLElement} The ad item element with added features.
   */
  addFeatures(adItem) {
    const article = $('article', adItem),
      link = article.dataset.href;
    return this.getAdDetailDOM(link).then((html) => {
      if (!html) return;
      $('.aditem-image > a', adItem).insertAdjacentHTML(
        'beforeend',
        this.html.getImageLoader()
      );
      article.insertAdjacentElement(
        'beforeend',
        this.addDescrptionButton(html, article)
      );

      const { isLiked, likeElem } = this.getWatchListStatus(html);
      if (isLiked) {
        $('.ellipsis', adItem).insertAdjacentElement('afterbegin', likeElem);
        css(adItem, { borderColor: '#b5e941', borderWidth: '2px' });
      }

      $('.aditem-image', article).addEventListener(
        'click',
        function (event) {
          this.events.emit('clickGallery', { html, article, event });
        }.bind(this)
      );
      return adItem;
    });
  }

  /**
   * Create and return a description button for an ad item.
   * @param {CheerioStatic} html - The parsed HTML of the ad detail page.
   * @param {HTMLElement} article - The article element of the ad item.
   * @returns {HTMLElement} The description button element.
   */
  addDescrptionButton(html, article) {
    const button = this.html.renderHTLMElement(
      `<div id="fa-ad-load-desc-wrapper">
        <button id="fa-ad-load-desc-btn">Gesamte Beschreibung abrufen</div>
      </div>`
    );
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.innerText = 'Beschreibung wird geladen...';
      const description = html('#viewad-description-text');
      const adItemDetails = $('.aditem-main--middle--description', article);
      adItemDetails.innerHTML = '';
      adItemDetails.insertAdjacentHTML('afterbegin', description);
      this.style.display = 'none';
    });
    return button;
  }

  /**
   * Determine the watchlist status of an ad and return the status and element.
   * @param {CheerioStatic} html - The parsed HTML of the ad detail page.
   * @returns {Object} An object containing the watchlist status and the like element.
   */
  getWatchListStatus(html) {
    const isLiked =
      html('#viewad-user-actions #viewad-lnk-watchlist').data('action') !==
      'add';
    if (isLiked) {
      const likeElem = this.html.renderHTLMElement(
        `<div id="fa-liked">
          ${this.html.getHeart()}
        </div>`
      );
      return { isLiked, likeElem };
    }
    return { isLiked, likeElem: undefined };
  }
}
