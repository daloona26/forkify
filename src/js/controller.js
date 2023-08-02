'use strict';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
const { async } = require('regenerator-runtime');

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipes = async function () {
  // loading recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.showSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery()
    if(!query) return
    model.loadSearchResults(query);
    console.log(model.state.search.results);
    
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

// controllRecipes();

// window.addEventListener('hashchange', controllRecipes);

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controlSearchResults)
};
init();
