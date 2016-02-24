

var Recipe = function(properties) {

}
/*
 * @param {Integer} score Integer from 1 to 5
 */
Recipe.prototype.rate = function(score) {

}
/*
 * @param {Object} properties Collection of properties to update
 */
Recipe.prototype.update = function(properties) {

}

var Recipes = function(arrayOfRecipes) {

}
/*
 * @return {Recipes}
 */
Recipes.prototype.fetchBy = function(propertyName, propertyValue) {

}
Recipes.prototype.append = function(recipe) {

}


//=============================

/* Web API

// Retrieve
fetchById
	GET: id, properties
	RETURNS: Recipe
fetchByCuisine
	GET: cuisine, properties
	RETURNS: array of Recipe

// Update
rateRecipe
	GET: id
	POST: int score
updateRecipe
	GET: id
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