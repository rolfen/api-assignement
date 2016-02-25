I chose node because it is a tool that I can know well, and a way to get started quickly, and was confident of my abilities within a given timeframe.

I chose express for an easier, more elegant (less boilerplate-y) way of handling HTTP requests, and because it exposes the node HTTP request object.

I use the SuperAgent framework for abstracting some of the HTTP boilerplate code in testing.

Although this particular exercise could have been completed without using any frameworks (outside node.js), the instructions seemed to somehow expect or encourage using one. Some level of abstraction is provided by these frameworks, making it more pleasant to write and read the code. The result would also possibly be more flexible and scalable. 

That is why I took this opportunity to learn about them and use them.

The API is pretty flexible and should be able to cater for most use cases.
ToDo: It is possible to specify the fields we want to retrieve. Different clients might be able to retrieve different fields of interest, ex: 
fetchById(12,['id','title','description_short']) // for space-limited mobile devices
fetchById(12,['id','title','description_full']) 


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
		title: "Hello",
		fat_grams: 12
	}
}