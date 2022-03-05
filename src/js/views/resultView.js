//* IMPORT
import View from './View'; // import parent
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // replace all original icons code from index.html
//////////////////////////////////
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = `No recipe found for your query. Please try again!`;
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
