var frameModule = require("ui/frame");
var moment = require('moment');
var Toast = require("nativescript-toast");

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
            var toast = Toast.makeText(message);
            toast.show();
            //alert(message);
        },

        handleHttpRequestError: function(response){
            console.log(JSON.stringify(response));
            var errorMessage = response.content.toJSON()['error_description'] || response.content.toJSON()['Message'] ;
            HelperModule.notify(errorMessage);
            return response;
        },

        getConnection: function(){
            var connectionType = connectivity.getConnectionType();
            if (connectionType == connectivity.connectionType.none){
                HelperModule.notify('You don\'t have connection');
            }
        },

        monitorConnection: function(){
            connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType){
                if (newConnectionType == connectivity.connectionType.none){
                    HelperModule.notify('You don\'t have connection');
                }
            });
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
        },

        formatStatusToEnum: function(statusNumber){
            var difficulties = [
                'Active', 'Completed', 'Failed', 'Declined'
            ];

            return difficulties[statusNumber];
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
exports.formatStatusToEnum = HelperModule.formatStatusToEnum;