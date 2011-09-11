var path = require('path');

var ROOT = path.resolve(__filename, '../..'); // examples dir

var connect = require('connect');
var app = connect();

app.use(connect.logger('dev'));
app.use(connect.responseTime());
app.use(connect.basicAuth('user', 'pass'));
app.use(connect.directory(ROOT, {icons: true}));
app.use(connect.static(ROOT));

app.listen(8888);
