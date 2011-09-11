var db = {
    connect: function(cb) { cb(); },
    useDatabase: function(db, cb) { cb(); },
    query: function(sql, cb) { cb(null, [[1], [2]]); }
}

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

var async = require('async');

function fetch_all_neatly(database, table, callback) {
    async.series({
        connect: db.connect.bind(db),
        use:     db.useDatabase.bind(db, database),
        query:   db.query.bind(db, "SELECT * FROM " + table)
    }, function(err, result) {
        callback(err, result.query);
    });
}

if (!module.parent) {
    var output = function(err, result) { console.log(result) }
    fetch_all("DB", "table", output);
    fetch_all_neatly("DB", "table", output);
}
