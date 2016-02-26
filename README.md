
#Gousto API exercice

## Choices

Firstly, I chose node because it is a tool that I can know well, and a way to get started quickly. I was confident of my abilities within a given timeframe.

I chose express for an easier, more elegant (less boilerplate-y) way of handling HTTP requests, and because it exposes the node HTTP request object, so it doesn't get in the way whenever low-level control is required.

For testing, I initially experimented with a couple of libraries for writing requests, and 'should" for making assertions, but after running into some problems with documentations, decided to write my own functions that.

Although this particular exercise could have been completed without using any frameworks at all (outside node.js), the instructions seemed to encourage using one.

Some level of abstraction is provided by these frameworks, making it more pleasant to write and read the code. The result should also be more flexible and scalable. 

## Web API


### Retrieve

    fetchById
	    GET: id
	    RETURNS: Recipe

    fetchByCuisine
	    GET: string cuisine
	    RETURNS: array of Recipe
    
### Update

    rateRecipe
	    GET: int id
	    POST: int(1...5) score

    updateRecipe
	    GET: int id
	    POST: Recipe
    
### Create

    storeNewRecipe
	    POST: Recipe
	    RETURNS: int id of new recipe on success


// no Delete?


### Data format

A "Recipe" in this context is just an object containing some or all of the visible properties of a recipe. Exampe of a partial representation:

    {
        id: 12,
        title: "Hello",
        fat_grams: 12
    }

### ToDo

It would be nice to specify the fields we want to retrieve. Different clients might be able to retrieve different fields of interest, something like that:

    // for space-limited mobile devices
    fetchById(12, ['id','title','description_short']) 
    // for bigger monitors
    fetchById(12,['id','title','description_full']) 
