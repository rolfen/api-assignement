'use strict';

var Recipe = function(properties) {
	this.data = {};
	if(typeof properties === 'object') {
		this.data = properties;
	}
}

/*
 * @param {Integer} score Integer from 1 to 5
 */
Recipe.prototype.rate = function(score) {
	if(!(typeof score === 'number') || score > 5 || score < 0) {
		throw new Error("Invalid score");
	}
	if (this.data.ratings instanceof Array) {
		this.data.ratings.push(score);
	} else {
		this.data.ratings = [score];
	}
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