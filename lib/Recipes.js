'use strict';

var Recipes = function(arrayOfRecipes) {
	var self = this;
	this.recipes = [];
	if(arrayOfRecipes instanceof Array) {
		this.recipes = arrayOfRecipes.map(function(recipe){
			return(self.append(recipe))
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
	return(this.recipes.filter(function(recipe){
		if(recipe.data[propertyName] === propertyName) {
			return recipe
		}
	}));
}
Recipes.prototype.append = function(recipe) {
	if(recipe instanceof Recipe) {
		this.recipes.push(recipe);
	} else {
		this.recipes.push(new Recipe(recipe));
	}
}

module.exports = Recipes;