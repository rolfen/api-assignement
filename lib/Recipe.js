'use strict';

var Recipe = function(properties) {
	var this.data = {};
	if(typeof properties === 'Object') {
		this.data = properties;
	}
}
/*
 * @param {Integer} score Integer from 1 to 5
 */
Recipe.prototype.rate = function(score) {
	// ToDo

}
/*
 * Update recipe with given properties.
 * @param {Object} properties Collection of properties to update
 */
Recipe.prototype.update = function(properties) {
	var self = this;
	Object.keys(properties).forEach(function(key){
		self.data[key] = properties[key];
	});
}

module.exports = Recipe;