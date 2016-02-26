'use strict';

var http = require('http');
var api = require('./lib/Api.js');

// the test error handler
var error = function(e) {
	try {
		throw new Error(e);		
	} catch(e) {
		throw e;
	} finally {
		runTests();
	}
}

var assert = function(test) {
	if(!test) {
		error("Assertion failed");
	}
} 

var assertEql = function(a, b) {
	if(JSON.stringify(a) !== JSON.stringify(b)) {
		var errMsg = "Test failed: a and b not equal";
		console.dir({
			error: errMsg,
			a: a,
			b: b
		})
		error(errMsg);
	}
}

var runTests = function() {

	// self-test
	api('/sayHello', function(response){
		assertEql(response, {what:'hello'});
	});

	// Fetch a recipe by id
	api('/fetchById?id=2', function(ret){
		var recipe = {"id":"2","created_at":"30/06/2015 17:58:00","updated_at":"30/06/2015 17:58:00","box_type":"gourmet","title":"Tamil Nadu Prawn Masala","slug":"tamil-nadu-prawn-masala","short_title":"","marketing_description":"Tamil Nadu is a state on the eastern coast of the southern tip of India. Curry from there is particularly famous and it's easy to see why. This one is brimming with exciting contrasting tastes from ingredients like chilli powder, coriander and fennel seed","calories_kcal":"524","protein_grams":"12","fat_grams":"22","carbs_grams":"0","bulletpoint1":"Vibrant & Fresh","bulletpoint2":"Warming, not spicy","bulletpoint3":"Curry From Scratch","recipe_diet_type_id":"fish","season":"all","base":"pasta","protein_source":"seafood","preparation_time_minutes":"40","shelf_life_days":"4","equipment_needed":"Appetite","origin_country":"Great Britain","recipe_cuisine":"italian","in_your_box":"king prawns, basmati rice, onion, tomatoes, garlic, ginger, ground tumeric, red chilli powder, ground cumin, fresh coriander, curry leaves, fennel seeds","gousto_reference":"58"};
		assertEql(ret, recipe);
	});

	// Fetch all recipes for a specific cuisine (should paginate)
	api('/fetchByCuisine?cuisine=mexican', function(ret){
		var recipes = [
			{"id":"10","created_at":"05/07/2015 17:58:00","updated_at":"05/07/2015 17:58:00","box_type":"gourmet","title":"Pork Katsu Curry","slug":"pork-katsu-curry","short_title":"","marketing_description":"Comprising all the best bits of the classic American number and none of the mayo, this is a warm & tasty chicken and bulgur salad with just a hint of Scandi influence. A beautifully summery medley of flavours and textures","calories_kcal":"511","protein_grams":"11","fat_grams":"62","carbs_grams":"0","bulletpoint1":"","bulletpoint2":"","bulletpoint3":"","recipe_diet_type_id":"meat","season":"all","base":"","protein_source":"pork","preparation_time_minutes":"45","shelf_life_days":"4","equipment_needed":"Appetite","origin_country":"Great Britain","recipe_cuisine":"mexican","in_your_box":"","gousto_reference":"56"}
		];
		assertEql(ret, recipes);
	});

	// Store a new recipe
	api('/newRecipe', function(response){
		// must return id of newly created recipe
		if(!(response.id && typeof response.id == 'number' && response.id > 0)) {
			error("Test failed: expected recipe id, got " + response.id);
		}
		// check if a recipe was stored
		api('/fetchByCuisine?cuisine=rolfian', function(resp){
			assert(resp.length > 0);
		});
	},{method:'POST'},{
		title:"New Veggie", 
		box_type:"Vegan",
		preparation_time_minutes: 30,
		recipe_cuisine: 'rolfian'
	});

	// Rate an existing recipe between 1 and 5
	var randRating = Math.ceil(Math.random() * 5);
	api('/rateRecipe?id=7', function(response){
		// check if it's saved last
		api('/fetchById?id=7',function(res){
			assertEql(res.ratings[res.ratings.length-1],randRating);
		});
	},{method:'POST'},{rating:randRating})

	// Update an existing recipe
	api('/updateRecipe?id=1', function(){
		// check if it's been updated
		api('/fetchById?id=1',function(res){
			assertEql(res.recipe_cuisine,'lithuanian');
		});
	},{method:'POST'},{recipe_cuisine:'lithuanian'});

	// check pagination
	(function(){
		// create some recipies
		['R1','R2','R3','R4','R5'].forEach(function(name, i, arr){
			var data = {recipe_cuisine: 'kentish'};
			data.title = name;
			api('/newRecipe', function(reponse){
				if(i === (arr.length-1)) {
					// last one
					api('/fetchByCuisine?cuisine=kentish&page_size=3&page=1', function(resp){
						assertEql(resp.length, 2);
					});
				}
			}, {method:'POST'}, data)
		})
	})()

	console.log("End reached");
}

runTests();
