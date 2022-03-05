//* IMPORT
import icons from 'url:../../img/icons.svg'; // replace all original icons code from index.html
////////////////////////////////////////////

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (i.e. recipe)
   * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined, string} a markup string is returned if render=false
   * @this {Object} View instance
   * @todo Finish implementation
   */
  render(data, render = true) {
    // If there is no data or empty array = show error message
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErr();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clearParentEl();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert newMarkup(string) to DOM object
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*')); //convert to array
    const currentEl = Array.from(this._parentEl.querySelectorAll('*')); //convert to array

    newElements.forEach((newEl, i) => {
      const curEl = currentEl[i];
      // UPDATE CHANGED TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🤡🤡🤡', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clearParentEl() {
    this._parentEl.innerHTML = '';
  }

  //* Render loading spinner
  renderSpinner() {
    const markup = `
      <div class="spinner">
         <svg>
           <use href="${icons}#icon-loader"></use>
         </svg>
      </div> `;
    this._clearParentEl();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderErr(message = this._errMessage) {
    const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clearParentEl();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
         <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clearParentEl();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
