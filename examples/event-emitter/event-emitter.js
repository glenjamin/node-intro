var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('event', console.log);
emitter.on('event', function(arg) {
    console.log("Multiple listeners");
});
emitter.on('error', console.warn);

emitter.emit('event', 'argument');
emitter.emit('error', 'whoops');


