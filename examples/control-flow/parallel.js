async.parallel({
    'socket':    initSocket,
    'amqp':      initAmqp,
    'db':        initDB,
    'interface', initInterface,
    'plugins',   initPlugins
},
function(err, results) {
    if (err) {
        console.warn("Initialisation failed: " +
                     err.message);
        process.exit(1);
    }
    startWorker(results);
});

