var application = require("application");
//application.mainModule = "./views/main/main-page";
application.mainModule = "./views/challenge/challenge-to-pick";
application.cssFile = "./styles/app.css";
application.start();

application.on(application.launchEvent, function (args) {

});
