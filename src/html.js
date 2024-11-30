import { Liquid } from 'liquidjs';

/**
 * Class representing an HTML renderer using Liquid template engine.
 */
export default class HTML {
  /**
   * Creates an instance of HTML.
   */
  constructor() {
    Object.defineProperties(this, {
      templateEngine: {
        value: new Liquid(),
      },
    });
  }

  /**
   * Renders a template literal using the Liquid template engine.
   * @param {string} templateLiteral - The template literal to render.
   * @returns {string} The rendered HTML string.
   */
  render(templateLiteral) {
    return this.templateEngine.parseAndRenderSync(templateLiteral);
  }

  /**
   * Renders a template literal and returns the first HTML element.
   * @param {string} templateLiteral - The template literal to render.
   * @returns {HTMLElement} The first HTML element from the rendered template.
   */
  renderHTLMElement(templateLiteral) {
    const htmlString = this.render(templateLiteral);
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
  }

  /**
   * Returns an SVG heart icon as a string.
   * @returns {string} The SVG heart icon.
   */
  getHeart() {
    return this.templateEngine.parseAndRenderSync(
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="#326916" fill-rule="evenodd" d="M8.73 14.23a1 1 0 0 1-1.46 0L2.14 8.78a4.02 4.02 0 0 1 0-5.62 3.85 3.85 0 0 1 5.86.4 3.85 3.85 0 0 1 5.86-.4 4.02 4.02 0 0 1 0 5.62l-5.13 5.45Z" clip-rule="evenodd"/></svg>`
    );
  }

  /**
   * Returns an SVG image loader as a string.
   * @returns {string} The SVG image loader.
   */
  getImageLoader() {
    return this.templateEngine.parseAndRenderSync(
      `<div id="fa-image-loading">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="12.698 21.898 120.779 135.497" width="120.779px" height="135.497px" id="fa-image-loading-image"><defs><bx:export><bx:file format="svg" path="Unbetitelt.svg"></bx:file></bx:export></defs><path fill="#1D4B00" d="M 101.15 154.229 C 83.59 154.229 75 141.974 73.256 139.442 C 68.073 144.543 60.249 154.229 46.156 154.229 C 29.881 154.229 16.161 141.929 16.161 121.987 L 16.161 55.488 C 16.161 35.501 29.903 23.247 46.155 23.247 C 62.408 23.247 76.149 36.262 76.149 55.185 C 79.36 54.046 82.743 53.467 86.15 53.472 C 102.894 53.472 116.144 67.199 116.144 83.698 C 116.144 88.323 115.27 92.437 113.359 96.378 C 123.977 101.135 131.143 111.84 131.143 124.003 C 131.143 140.67 117.686 154.229 101.15 154.229 Z M 80.508 132.135 C 84.821 139.687 92.081 144.153 101.15 144.153 C 112.174 144.153 121.147 135.111 121.147 124.003 C 121.147 115.215 115.54 107.568 107.473 104.877 L 80.507 132.139 L 80.507 132.135 L 80.508 132.135 Z M 46.159 33.322 C 36.207 33.322 26.161 40.176 26.161 55.488 L 26.161 121.988 C 26.161 137.299 36.203 144.153 46.159 144.153 C 54.059 144.153 58.427 140.135 65.471 133.036 L 68.591 129.892 C 66.981 125.059 66.151 119.695 66.151 113.923 L 66.151 55.483 C 66.151 40.172 56.111 33.317 46.154 33.317 L 46.159 33.322 Z M 76.153 66.238 L 76.153 113.928 C 76.153 116.628 76.378 119.197 76.806 121.616 L 98.539 99.716 C 104.853 93.356 106.147 88.713 106.147 83.702 C 106.147 72.997 97.61 63.552 86.149 63.552 C 82.584 63.552 79.173 64.476 76.153 66.243 L 76.153 66.238 Z"></path></svg>
      </div>`
    );
  }

  /**
   * Returns an SVG page loader as a string.
   * @returns {string} The SVG page loader.
   */
  getPageLoader() {
    return this.templateEngine.parseAndRenderSync(
      `<div id="fa-loading">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="12.698 21.898 120.779 135.497" width="120.779px" height="135.497px" id="fa-loading-image"><defs><bx:export><bx:file format="svg" path="Unbetitelt.svg"></bx:file></bx:export></defs><path fill="#1D4B00" d="M 101.15 154.229 C 83.59 154.229 75 141.974 73.256 139.442 C 68.073 144.543 60.249 154.229 46.156 154.229 C 29.881 154.229 16.161 141.929 16.161 121.987 L 16.161 55.488 C 16.161 35.501 29.903 23.247 46.155 23.247 C 62.408 23.247 76.149 36.262 76.149 55.185 C 79.36 54.046 82.743 53.467 86.15 53.472 C 102.894 53.472 116.144 67.199 116.144 83.698 C 116.144 88.323 115.27 92.437 113.359 96.378 C 123.977 101.135 131.143 111.84 131.143 124.003 C 131.143 140.67 117.686 154.229 101.15 154.229 Z M 80.508 132.135 C 84.821 139.687 92.081 144.153 101.15 144.153 C 112.174 144.153 121.147 135.111 121.147 124.003 C 121.147 115.215 115.54 107.568 107.473 104.877 L 80.507 132.139 L 80.507 132.135 L 80.508 132.135 Z M 46.159 33.322 C 36.207 33.322 26.161 40.176 26.161 55.488 L 26.161 121.988 C 26.161 137.299 36.203 144.153 46.159 144.153 C 54.059 144.153 58.427 140.135 65.471 133.036 L 68.591 129.892 C 66.981 125.059 66.151 119.695 66.151 113.923 L 66.151 55.483 C 66.151 40.172 56.111 33.317 46.154 33.317 L 46.159 33.322 Z M 76.153 66.238 L 76.153 113.928 C 76.153 116.628 76.378 119.197 76.806 121.616 L 98.539 99.716 C 104.853 93.356 106.147 88.713 106.147 83.702 C 106.147 72.997 97.61 63.552 86.149 63.552 C 82.584 63.552 79.173 64.476 76.153 66.243 L 76.153 66.238 Z"></path></svg>
            </div>
            <p id="fa-loading-text">Einen Moment Geduld, ich räum das mal auf..</p>
        </div>`
    );
  }
}
