//* IMPORT
import View from './View'; // import parent
import icons from 'url:../../img/icons.svg'; // replace all original icons code from index.html
//////////////////////////////////
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _nextBtn;
  _prevBtn;

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      // Use dataset to get data from current page
      const goToPage = +btn.dataset.goto; // convert to number
      handler(goToPage);
    });
  }

  _generateMarkupBtn(currentPage, numPages) {
    this._prevBtn = `
        <button data-goto = "${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
    `;

    this._nextBtn = `
        <button data-goto = "${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
  `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // compute how many pages there are
    this._generateMarkupBtn(currentPage, numPages);

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) return this._nextBtn;

    // Last page
    if (currentPage === numPages && numPages > 1) return this._prevBtn;

    // Other page
    if (currentPage < numPages) return `${this._prevBtn} ${this._nextBtn}`;

    // Page 1 and there are NO other pages
    return '';
  }
}

export default new PaginationView();
