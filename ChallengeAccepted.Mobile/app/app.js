var application = require("application");
var databaseModule = require("./database/database");

application.mainModule = "./views/main";
application.cssFile = "./styles/app.css";

application.on(application.launchEvent, function (args) {

});

//TODO id created, don't create again
databaseModule.initializeSQLite();

application.start();