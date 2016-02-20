var frameModule = require("ui/frame");
var moment = require('moment');

var HelperModule = (function() {

    var HelperModule = {

        navigate: function(toPagePath, contextObj) {

            var navigationEntry = {
                moduleName: toPagePath,
                context: contextObj
            };

            var topmost = frameModule.topmost();
            topmost.navigate(navigationEntry);
        },

        navigateAnimated: function(toPagePath, contextObj) {

            var navigationEntry = {
                moduleName: toPagePath,
                // Makes the page we are navigating to to not be available on back button
                //backstackVisible: false,
                context: contextObj,
                animated: true,
                navigationTransition: {
                    transition: "slide ",
                     duration: 380,
                     curve: "easeIn"

                },
                // Removes all the navigation history
                // clearHistory: true
            };

            var topmost = frameModule.topmost();
            topmost.navigate(navigationEntry);
        },

        notify: function(message){
            alert(message);
        },

        handleHttpRequestError: function(response){
            console.log(response);
            var errorMessage = response.content.toJSON()['error_description'];
            HelperModule.notify(errorMessage);
        },

        formatDateToShort: function (date) {
            var shortDate = moment(date.toString()).format('MMMM Do YYYY, h:mm:ss a');
            return shortDate;
        },

        formatDifficultyToEnum: function(difficultyNumber){
            var difficulties = [
                'Easy', 'Medium', 'Hard', 'Insane'
            ];

            return difficulties[difficultyNumber];
        }

    };

    return HelperModule;
})();

exports.navigate = HelperModule.navigate;
exports.navigateAnimated = HelperModule.navigateAnimated;
exports.notify = HelperModule.notify;
exports.handleHttpRequestError = HelperModule.handleHttpRequestError;
exports.formatDateToShort = HelperModule.formatDateToShort;
exports.formatDifficultyToEnum = HelperModule.formatDifficultyToEnum;