var exec = require("exec"),
    query = require("querystring"),
    formi = require("formidable"),
    fs = require("fs");

function start(response){
	console.log("Request Handler 'start' has been summoned");
	var body = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>'+
	'</head><body><form action="/upload" enctype="multipart/form-data" method="post">'+
	'<input type="file" name="upload">'+
	'<input type="submit" value="Upload File" />'+
	'</form>'+'</body>'+'</html>';

	/*exec("ls -lah", function(error, stdout, stderr){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});*/

	/*What exec() does ? ::: It 'Executes A Shell Command' from within
	  Node.js. In this example, it is extracting the list of all files
	  in the current directory. */
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response,request){
	console.log("Request Handler 'upload' was called.");
	var form = new formi.IncomingForm();
	console.log("parsing ..");
	form.parse(request, function(error, fields, files){
		console.log("parsed!");
		fs.rename(files.upload.path, "/tmp/test.png", function(err){			if(err){console.log(err.message);}
	});	
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();
	});
}

function show(resp, request){
	console.log("Request handler 'show' was called.");
	fs.readFile('/tmp/test.png', 'binary', function(error, file){
		if(error){
		   resp.writeHead(500, {'Content-Type': 'text/plain'});
		   resp.write(error+"\n");
		   resp.end();
		}else{
		   resp.writeHead(200, {'Content-Type': 'image/png'});
		   resp.write(file,"binary");
		   resp.end();
		}
	});
}

function favi(response){
	console.log("Yes we are annoying!");
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.favi = favi;
