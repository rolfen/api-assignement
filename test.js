'use strict';

/*
	Test requirements
*/

require('should');
var request = require('unirest');
var baseUrl = "http://127.0.0.1";

var runTests = function() {
	// self-test
	request.get(baseUrl + '/sayHello').end(function(res){
	  	res.body.should.eql({what:'hello'});
	});
	
	// Fetch a recipe by id
	request.get(baseUrl + '/fetchById?id=2').end(function(res){
		res.body.should.eql({"id":"2","created_at":"30/06/2015 17:58:00","updated_at":"30/06/2015 17:58:00","box_type":"gourmet","title":"Tamil Nadu Prawn Masala","slug":"tamil-nadu-prawn-masala","short_title":"","marketing_description":"Tamil Nadu is a state on the eastern coast of the southern tip of India. Curry from there is particularly famous and it's easy to see why. This one is brimming with exciting contrasting tastes from ingredients like chilli powder, coriander and fennel seed","calories_kcal":"524","protein_grams":"12","fat_grams":"22","carbs_grams":"0","bulletpoint1":"Vibrant & Fresh","bulletpoint2":"Warming, not spicy","bulletpoint3":"Curry From Scratch","recipe_diet_type_id":"fish","season":"all","base":"pasta","protein_source":"seafood","preparation_time_minutes":"40","shelf_life_days":"4","equipment_needed":"Appetite","origin_country":"Great Britain","recipe_cuisine":"italian","in_your_box":"king prawns, basmati rice, onion, tomatoes, garlic, ginger, ground tumeric, red chilli powder, ground cumin, fresh coriander, curry leaves, fennel seeds","gousto_reference":"58"});
	});

	// Fetch all recipes for a specific cuisine (should paginate)
	request.get(baseUrl + '/fetchByCuisine?cuisine=mexican').end(function(res){
		res.body.should.eql([
			{"id":"10","created_at":"05/07/2015 17:58:00","updated_at":"05/07/2015 17:58:00","box_type":"gourmet","title":"Pork Katsu Curry","slug":"pork-katsu-curry","short_title":"","marketing_description":"Comprising all the best bits of the classic American number and none of the mayo, this is a warm & tasty chicken and bulgur salad with just a hint of Scandi influence. A beautifully summery medley of flavours and textures","calories_kcal":"511","protein_grams":"11","fat_grams":"62","carbs_grams":"0","bulletpoint1":"","bulletpoint2":"","bulletpoint3":"","recipe_diet_type_id":"meat","season":"all","base":"","protein_source":"pork","preparation_time_minutes":"45","shelf_life_days":"4","equipment_needed":"Appetite","origin_country":"Great Britain","recipe_cuisine":"mexican","in_your_box":"","gousto_reference":"56"}
		]);
	});

	// Store a new recipe
	// Update an existing recipe

	// Rate an existing recipe between 1 and 5
	request.post(baseUrl + '/rateRecipe?id=10').send('4').end(function(res){
		// issue: fails on second run. Must reset recipe.
		request.get(baseUrl + '/fetchById?id=10').end(function(res){
			res.body.ratings.should.eql([4]);
		});
	});


	console.log("End reached");
}

runTests();