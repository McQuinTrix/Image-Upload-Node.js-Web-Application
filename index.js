var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandler");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/favicon.ico"] = requestHandlers.favi;
handle["/show"] = requestHandlers.show;

server(router.route, handle);
