'use strict';

/*
 * Testing helper.
 */

var http = require('http');

var baseOptions;

/*
 * Merges baseOptions with props and returns the resulting object
 */
var generateOptions = function(props){
	var currOptions = Object.create(baseOptions);
	Object.keys(props).forEach(function(key){
		currOptions[key] = props[key];
	});
	return(currOptions);
}

/*
 * 
 */
var onSuccess = function(callback){
	var handler = function(res){
		var ret = '';
		res.on('data', function(data){
			ret += data;
		});
		res.on('end', function(){
			try {
				var parsed = JSON.parse(ret);				
			} catch(e) {
				var parsed = ret;
				console.log("Not valid JSON: "+ret);
			}
			callback(parsed);
		});
	}
	return(handler);
}

/*
 * Boilerplate-light way to call the API
 * @param urn: The URN (eg: /fetchById?id=3)
 * @param callback: This callback will be called on success. It takes a single argument: the returned value
 * @param options: Request options. Mostly useful for {method: 'POST'}
 * @param data: If method is post then this data will be POSTed
 */
var api = function(urn, callback, options, data){
	var opt = (typeof options === 'object') ? options : {};
	opt.path = urn;
	var req = http.request(
		generateOptions(opt),
		onSuccess(callback)
	)
	if(opt.method && opt.method.toLowerCase() === 'post') {
		req.write(JSON.stringify(data), 'utf-8', function(){
			req.end();			
		})
	} else {
		req.end();		
	}
}

module.exports = function(options){
	baseOptions = options;
	return api;
}