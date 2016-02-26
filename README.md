
#Gousto API exercice

## Getting Started

You will need node (or compatible) installed on your machine.  
First, clone the repository, or extract the archive into a directory, and from within that directory, please run:

    npm install

This will install all the npm dependencies.  
The server can then be started with

    node ./index.js

Once the server is running, the test script can be run against it with any of the following commands:

    node ./test.js
    npm test

### Configuration

The server will run on port 8808 by default. This can be changed in 'config.js'.


## About the Choices

Firstly, I chose node because it is a tool that I can know well, and a way to get started quickly. I was confident of my abilities within a given timeframe.

I chose express for an easier, more elegant (less boilerplate-y) way of handling HTTP requests, and because it exposes the node HTTP request object, so it doesn't get in the way whenever low-level control is required.

For testing, I initially experimented with a couple of libraries for writing requests, in addition to 'should" for making assertions, but after running into some problems with documentation, I decided to write my own functions for that.

Although this particular exercise could have been completed without using any frameworks at all (outside node.js), the instructions seemed to encourage using one.

Some level of abstraction is provided by these frameworks, making it more pleasant to write and read the code. The result should also be more flexible and scalable. 

## Web API

The API uses a combination of "query string" parameters (eg: ?id=12&title=something) and POST data.

POST and response data should use JSON and be encoded in UTF-8.

### Retrieve

    fetchById
	    QUERY: int id
	    RETURNS: Recipe

    fetchByCuisine
	    QUERY: string cuisine
	    RETURNS: array of Recipe
    
### Update

    rateRecipe
	    QUERY: int id
	    POST: {rating: <score>}, score being an int between 0 and 5

    updateRecipe
	    QUERY: {id: <id>}
	    POST: Recipe
    
### Create

    newRecipe
	    POST: Recipe
	    RETURNS: {id: <id>}, id of new recipe on success


(ToDo: no Delete?)


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
