var fs = require('fs');
var util = require('util');

var async = require('async');

var module = require('./my-module');
var magic = require('./magic')('stuff');

/* my-module.js */
exports.publicFunction = function() {
    return 'something';
}

exports.anotherFunction = function() {
    return 'else';
}

/* magic.js */
module.exports = function(arg) {
    return {
        func: function() { return arg; }
    };
}
