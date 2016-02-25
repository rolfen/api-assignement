I chose node because it is a tool that I can know well, and a way to get started quickly, and was confident of my abilities within a given timeframe.

I chose express for an easier, more elegant way of writing the HTTP request code, without stopping me from accessing the HTTP request object if needed.

Web API:

// Retrieve
fetchById
	GET: id, object properties
	RETURNS: Recipe
fetchByCuisine
	GET: string cuisine, object properties
	RETURNS: array of Recipe

// Update
rateRecipe
	GET: int id
	POST: int(1...5) score
updateRecipe
	GET: int id
	POST: Recipe

// Create
storeNewRecipe
	POST: Recipe
	RETURNS: int id of new recipe on success

// no Delete?

Web API JSON formats:

id is a positive int

Recipe (example):
{
	id: 12,
	properties: {
		title: "Yo",
		fat_grams: 12
	}
}