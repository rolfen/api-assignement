'use strict';

// returns a timestamp for the given date, in the format used in the sample data
var timestamp = function(d) {
	return(d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear() + ' ' +  d.toLocaleTimeString('en-gb'))
}

var Recipe = function(properties) {
	if(typeof properties === 'object') {
		this.data = properties;
	} else {	
		this.data = {};
	}
	if(!this.data.created_at) {
		this.data.created_at = timestamp(new Date());
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
	if(Object.keys(properties).length > 0) {
		self.data.updated_at = timestamp(new Date());
		Object.keys(properties).forEach(function(key){
			self.data[key] = properties[key];
		});
	}
}

module.exports = Recipe;