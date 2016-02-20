var application = require("application");
var moment = require('moment');
application.mainModule = "./views/main/main";
application.cssFile = "./styles/app.css";

application.on(application.launchEvent, function (args) {

});

application.resources = {
    formatDateToShort: function (date) {
        var shortDate = moment(date.toString()).format('MM-DD-YYYY');
console.log('in format', shortDate);
        return shortDate.toString();
    }
}

application.start();