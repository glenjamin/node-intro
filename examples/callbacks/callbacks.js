function fetch_all(database, table, callback) {
    db.connect(function(err) {
        if (err) {
            callback(err);
            return;
        }
        db.useDatabase(database, function(err) {
            if (err) {
                callback(err);
                return;
            }
            db.query("SELECT * FROM " + table, callback);
        });
    });
}


function expensive_operation(a, b, callback) {
    var c = a + b;
    process.nextTick(function() {
        callback(null, c);
    })
}

expensive_operation(3, 4, function(err, result) {
    if (err) {
        console.warn(err);
    } else {
        console.log(result);
    }
});
