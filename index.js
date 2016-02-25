'use strict';

var express = require('express');
var Recipes = require('./lib/Recipes.js');
var Recipe = require('./lib/Recipe.js');

var goustoAPI = express();

goustoAPI.get('/fetchById', function(req, res){
	res.send({what:"yo!"});
});

goustoAPI.listen(80, function () {
  console.log('Listening');
});

//=============================

/* Web API

// Retrieve
fetchById
	PARAMS: id, properties
	RETURNS: Recipe
fetchByCuisine
	PARAMS: cuisine, properties
	RETURNS: array of Recipe

// Update
rateRecipe
	PARAMS: id
	POST: int score
updateRecipe
	PARAMS: id
	POST: Recipe

// Create
storeNewRecipe
	POST: Recipe
	RETURNS: id of new recipe

// no Delete?

Web API data format examples:

Recipe:
{
	id: 12,
	properties: {
		title: "Yo",
		fat_grams: 12
	}
}


*/