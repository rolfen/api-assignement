'use strict';

var Recipes = function(itemClass, arrayOfRecipes) {
	var self = this;
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
 * @return {Recipes} 
 */
Recipes.prototype.fetchBy = function(propertyName, propertyValue) {
	return(new Recipes(this.itemClass, this.recipes.filter(function(recipe){
		return(recipe.data[propertyName] === propertyValue);
	})));
}
/*
 * Get recipes as array of generic objects
 */
Recipes.prototype.export = function() {
	var out = [];
	this.recipes.forEach(function(recipe){
		out.push(recipe.data);
	});
	return out;
}

/*
 * @param {Recipe} recipe The Recipe object to add. Anothing else will be converted.
 */
Recipes.prototype.append = function(recipe) {
	if(recipe instanceof this.itemClass) {
		this.recipes.push(recipe);
	} else {
		this.recipes.push(new this.itemClass(recipe));
	}
}

module.exports = Recipes;