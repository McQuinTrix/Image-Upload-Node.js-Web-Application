var http = require("http");
var url  = require("url");

function start(route,handle){
	function onRequest(request, response){
		var postData = "";
		var path = url.parse(request.url).pathname;
		console.log("Request for "+path+" received.");

		/*request.setEncoding("utf8");

		request.addListener("data", function(postDataC){
			postData += postDataC;
			console.log("Received data chunk '"+
				postDataC + "'.");
		});

		request.addListener("end", function(){*/
		   //passing final data to router
		   route(handle, path, response, request);
		//});
	}
	http.createServer(onRequest).listen(3001);
	console.log("Server has started.");
}

module.exports = start;
