//* IMPORT
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2
/////////////////////////////////////////////////////////////
//* CONTROLLER
const controlRecipe = async function () {
  try {
    // Dynamically get ID
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Update resultView to mark selected result
    resultView.update(model.getSearchResultPage());

    // 2. Mark selected result
    bookmarksView.update(model.state.bookmarks);

    // 3. Loading recipe (call recipe from model.js)
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 4. Rendering recipe (from recipeView.js)
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErr();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1. Get search result
    const query = SearchView.getQuery();
    if (!query) return;

    // 2. Load search result
    await model.loadSearchResults(query);

    // 3. Render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    // 4. Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render NEW result
  resultView.render(model.getSearchResultPage(goToPage));

  // Render NEW pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings (in state {})
  model.updateServings(newServings);
  // Update recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update bookmark recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Display success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL (history API)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('👹👹', err);
    addRecipeView.renderErr(err.message);
  }
};
/////////////////////////////
//* PUBLISHER SUBSCRIBER PATTERN
// Init function to handle eventListener
// Event should be handled in controller.js (look at notes)
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
