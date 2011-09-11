var http = require('http');

var options = { host: "localhost", port: 8888,
                method: "POST", path: "/path" }

var req = http.request(options, function(resp) {
    resp.setEncoding('utf8');
    console.log(resp.statusCode);
    var data = '';
    resp.on('data', function(chunk) { data += chunk });
    resp.on('end', function() { console.log(data) });
});
req.write("POST BODY");
req.end();


