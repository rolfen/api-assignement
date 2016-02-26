'use strict';

function maxArray(a) {
  var max=a[0]; for(var i=0,j=a.length;i<j;i++){max=a[i]>max?a[i]:max;}
  return max;
}

/*
 * Recipes are a collection or Recipe items
 * @param {Object} itemClass The object definition for child items
 * @param {Array} arrayOfRecipes Optional array of child items to be preloaded in the collection
 */
var Recipes = function(itemClass, arrayOfRecipes) {
	var self = this;
	this.ids = [];
	this.itemClass = itemClass;
	this.recipes = [];
	if(arrayOfRecipes instanceof Array) {
		arrayOfRecipes.forEach(function(recipe){
			self.append(recipe);
		});
	} else {
		this.recipes = [];
	}
}

/*
 * Get recipies where the value for propertyName equals propertyValue
 * @param {String} propertyName The property name to check against
 * @param propertyValue Match items which have their propertyName property set to propertyValue
 * @return {Recipes} 
 */
Recipes.prototype.fetchBy = function(propertyName, propertyValue) {
	return(new Recipes(this.itemClass, this.recipes.filter(function(recipe){
		return(recipe.data[propertyName] === propertyValue);
	})));
}

/*
 * Get all recipes in collection as array of generic objects
 * @return {Array} 
 */
Recipes.prototype.export = function() {
	var out = [];
	this.recipes.forEach(function(recipe){
		out.push(recipe.data);
	});
	return out;
}

/*
 * All added recipies get passed through this function
 * @param {Recipe} recipe The Recipe object to add. If it's a non-Recipe object, we will attempt to convert it.
 * @return {Integer} The numeric ID of the newly created recipe (-1 on failure to create)
 */
Recipes.prototype.append = function(recipe) {

	var skip = false;

	// convert objects to recipe instances
	if(recipe instanceof this.itemClass) {
		var newRecipe = recipe;
	} else {
		var newRecipe = new this.itemClass(recipe);
	}

	// deal with the id stuff. try to enforce unique IDs.
	if(!isNaN(newRecipe.data.id)) {
		// id given
		var id = parseInt(newRecipe.data.id);
		if(this.ids.indexOf(id) > -1) {
			// given id already in use
			skip = true;
			console.log("Skipping recipe with duplicate id " + id);
		} else {
			// we can keep it, just make sure it's an int
		}
	} else if(isNaN(newRecipe.data.id)) {
		// no id given, automatically determine it
		var lastId = parseInt(maxArray(this.ids));
		if(isNaN(lastId)) {
			// no valid previous id found, start at 1
			newRecipe.data.id = 1;
		} else {
			// autoincremented id
			newRecipe.data.id = lastId + 1;
		}
	}

	if(!skip) {
		this.recipes.push(newRecipe);
		this.ids.push(parseInt(newRecipe.data.id));
		return(parseInt(newRecipe.data.id))
	} else {
		return -1;
	}

}

module.exports = Recipes;