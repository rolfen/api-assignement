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

## About the Code

There are three files in the lib/ folder.

### Recipe.js

This is the Recipe object, with methods to update and add a rating. Ratings are kept in an array on the object, in the data.ratings property.
The Recipe object tries to keep `created_at` and `updated_at` timestamps up-to-date.

### Recipes.js

The Recipes object has methods to filter and manage a collection of recipes.The `append()` method automatically generates an ID if needed, and tries to keep IDs unique if it is given one. Recipes with conflicting IDs cannot be appended.

### Api.js

Provides a helper function for sending requests to the API, for testing.

POST Example:


    api('/updateRecipe?id=3', function(response){
        // Do something with the server response. It will normally be a parsed JSON object.
      },{method:'POST'},{
        // Update these recipe properties
        title:"New Veggie" 
      }
    );

If not specified, method will default to GET:


    api('/fetchById?id=4', function(response){
       // Do somethin with the server response.
    });


For more details please look at the source.

## About the Platform Choices

I chose node.js because it is a tool that I am familiar with, and a way to get started quickly. I believe that node offers flexibility whilst keeping complexity low, which I feel is appropriate for this task.

I chose express for an easier, more elegant (less boilerplate-y) and extensible way of handling HTTP requests, and because it exposes the node HTTP request object, so it doesn't get in the way whenever low-level control is required.

For testing, I initially experimented with a couple of libraries for writing requests and 'should" for making assertions, but after running into some problems with documentation, I decided to write my own functions for that.

Although this particular exercise could have been completed without the usage of any framework outside node.js and npm, the instructions seemed to suggest using one, to some extent.

Some amount of abstraction is provided by express, making it more pleasant to write and read the code.

## Web API

The API uses a combination of "query string" parameters (eg: ?id=12&title=something) and POST data.

POST and response data should be in JSON and be encoded in UTF-8.

### Retrieve

    fetchById
	    QUERY:
            id: Numerical recipe id
	    RETURNS: Recipe object

    fetchByCuisine
	    QUERY: 
            cuisine: Name of the cuisine
            page_size: Optional, number of recipes per page. Defaults to 0 which disables pagination.
            page: Optional, current page. Defaults to 0.
	    RETURNS: array of Recipes
    
### Update

    rateRecipe
	    QUERY: id
	    POST: {rating: <score>}, score being an int between 0 and 5

    updateRecipe
	    QUERY: id
	    POST:  A key/value object of properties to update, Example:
            For example: {
                id: 12,
                title: "Hello",
                fat_grams: 12
            }

    
### Create

    newRecipe
	    POST: A key/value object of properties
	    RETURNS: {id: <id>}, id of new recipe on success


### ToDo

No Delete?

It would be nice to specify the fields we want to retrieve. Different clients might be able to retrieve different fields of interest, something like that:

    // for space-limited mobile devices
    fetchById(12, ['id','title','description_short']) 
    // for bigger monitors
    fetchById(12,['id','title','description_full'])