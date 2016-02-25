'use strict';

var fs = require('fs');
var express = require('express');
var Recipes = require('./lib/Recipes.js');
var Recipe = require('./lib/Recipe.js');

var parse = require('csv-parse');

var api = express();

// load data
fs.readFile("data/input.csv", 'utf8', function(err, fileContents){
	if(err) throw err;
	parse(fileContents, function(err, parsedCsv){
		/*
		 * Convert a single parsed CSV record (row/line) to a JSON object
		 * @param {Array} properties Array of property names
		 * @param {Array} record An array of parsed CSV fields, will be mapped to the property names
		 * @return {Objet} JSON representation of the record, with property values mapped to property names
		 */
		var toJson = function(properties, record) {
			var recordObj = {};
			record.forEach(function(val, index){
				recordObj[properties[index]] = val;
			})
			return recordObj;
		}

		var data = parsedCsv.slice(1).map(function(val){
			return toJson(parsedCsv[0], val);
		});

		startupServer(api, data);
	})
});


/*
 * Starts up blank express app "api" with preloaded data "data"
 */
var startupServer = function(api, data) {
	api.get('/printAll', function(req, res){
		res.send({what:data});
	});

	api.get('/sayHello', function(req, res){
		res.send({what:data});
	});

	api.get('/fetchById', function(req, res){
		res.send({what:"yo!"});
	});

	api.listen(80, function () {
	  console.log('Listening');
	});
}


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