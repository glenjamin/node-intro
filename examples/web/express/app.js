
/**
 * Module dependencies.
 */

var express = require('express');

// Fake user model
var User = {lookup: function(name, cb) { cb(null, {name: name}); }};

var app = module.exports = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.param('userName', function(req, res, next, username) {
  User.lookup(username, function(err, user) {
    req.user = user;
    next(err);
  });
});
app.get('/profile/:userName', function(req, res) {
  res.render('profile', { title: 'Profile',
                          user: req.user });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
