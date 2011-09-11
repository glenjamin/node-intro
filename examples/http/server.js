var http = require('http');

http.createServer(function(req, resp) {
    req.setEncoding('utf8');
    var data = '';
    req.on('data', function(chunk) { data += chunk; });
    req.on('end', function() {
        console.log("Request for: " +
                    req.method + " " + req.url);
        console.log("Body: " + data);
        resp.writeHead(418, {'Content-Type': 'text/plain',
                             'Content-Length': 12});
        resp.write("I'm a teapot");
        resp.end();
    });
}).listen(8888);

