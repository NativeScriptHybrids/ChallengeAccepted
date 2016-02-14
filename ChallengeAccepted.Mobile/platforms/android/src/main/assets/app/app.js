var application = require("application");
application.mainModule = "./views/main/main-page";
application.cssFile = "./styles/app.css";
application.start();

application.on(application.launchEvent, function (args) {

});
