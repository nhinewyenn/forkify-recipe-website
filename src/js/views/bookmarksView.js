//* IMPORT
import View from './View'; // import parent
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // replace all original icons code from index.html
//////////////////////////////////
class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
