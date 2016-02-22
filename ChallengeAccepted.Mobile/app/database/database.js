var Sqlite = require("nativescript-sqlite");

exports.initializeSQLite = function() {
    var db_promise = new Sqlite("ChallengeAccepted.sqlite", function(err, db) {
        if (err) {
            console.error("Failed to open database", err);
        } else {
            // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
            console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No");
            global.db = db;
        }

        global.db.execSQL("CREATE TABLE `Profile` (`Username` TEXT NOT NULL, `ImageUrl` TEXT NOT NULL );");

        console.log("Tables created...");
    });

};