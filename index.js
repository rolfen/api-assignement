'use strict';

var fs = require('fs');
var express = require('express');

var Recipe = require('./lib/Recipe.js');
var Recipes = require('./lib/Recipes.js');

var parse = require('csv-parse');

var api = express();

// our POST parsing middleware
api.use(function(req, res, next){
	var bodyStr = '';
	req.on("data", function(chunk){
		bodyStr += chunk.toString();
	});
	req.on("end", function(){
		try {
			req.body = JSON.parse(bodyStr)
		} catch(e) {
			req.body = bodyStr;
		}
		next();
	});
});

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

		// convert parsed CSV data to a Recipies object
		var data = parsedCsv.slice(1).map(function(val){
			return toJson(parsedCsv[0], val);
		});

		startupServer(api, new Recipes(Recipe, data));
	})
});


/*
 * Starts up blank express app "api" with preloaded recipies
 * @param express Express application
 * @param {Recipies} recipies Recipies collection
 */
var startupServer = function(api, recipes) {
	api.get('/printAll', function(req, res){
		res.send({what:recipes});
	});

	api.get('/sayHello', function(req, res){
		res.send({what:'hello'});
	});

	api.get('/fetchById', function(req, res){
		var found = recipes.fetchBy('id',req.query['id']).export()[0];
		res.send(found);
	});

	api.get('/fetchByCuisine', function(req, res){
		var found = recipes.fetchBy('recipe_cuisine',req.query['cuisine']).export();
		res.send(found);
	});

	api.post('/rateRecipe', function(req, res){
    	var recipe = recipes.fetchBy('id', req.query['id']).recipes[0];
    	if(recipe instanceof recipes.itemClass) {
			recipe.rate(req.body.rating);
	        res.send({rating:req.body.rating});
    	}
	});

	api.post('/updateRecipe', function(req, res, next){
    	var recipe = recipes.fetchBy('id', req.query['id']).recipes[0];
		recipe.update(req.body);
		res.send({id: req.query['id']})		
	});

	api.post('/newRecipe', function(req, res, next){
		var newRecipe = recipes.append(req.body)
	    res.send({id: 1});				
	});

	api.listen(80, function () {
	  console.log('Listening');
	});
}


//=============================

/* Web API

// Retrieve
fetchById
	PARAMS: id
	RETURNS: Recipe
fetchByCuisine
	PARAMS: cuisine, pageSize, page
	RETURNS: array of Recipe

// Update
rateRecipe
	PARAMS: id
	POST: int score
updateRecipe
	PARAMS: id
	POST: Recipe

// Create
newRecipe
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