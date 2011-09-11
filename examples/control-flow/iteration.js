async.forEach(files,
    function iterator(file, next) {
        file.save(next);
    },
    function finished(err) {
        console.log("All files have been saved");
    }
);

async.forEachSeries(files,
    //...
);


