I chose node because it is a tool that I can know well, and a way to get started quickly, and was confident of my abilities within a given timeframe.

I chose express for an easier, more elegant way of writing the HTTP request code which does not stop me from accessing the node HTTP request object directly if needed.

I use the SuperAgent framework for abstracting some of the HTTP boilerplate code in testing.

Although this particular exercise could have been completed without using any frameworks (outside node.js), the instructions seemed to somehow expect or encourage using one. Some level of abstraction is provided by these frameworks, making it more pleasant to write and read the code. The result would also possibly be more scalable. 
That is why I took this opportunity to learn about them and use them.

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