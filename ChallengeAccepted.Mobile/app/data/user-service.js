var http = require("http");
var httpRequester = require("~/data/http-requester");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var userService = (function () {

    var userService = {

        getAllChallenges: function (success, error) {
            var actionUrl = 'api/Challenge/Get';
            var headers = {
                "Content-Type": "application/json"
            };

            return httpRequester.get(actionUrl, headers, success, error);

        },

        getCompletedChallenges: function (success, error) {
            var actionUrl = 'api/ChallengeResponse/GetCompleted';

            return httpRequester.authGet(actionUrl, success, error);
        },

        addChallenge: function (challenge, success, error) {
            var actionUrl = 'api/Challenge/Add';
            var content = JSON.stringify(challenge);
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            console.log(JSON.stringify(content));
            console.log(JSON.stringify(headers));

            return httpRequester.post(actionUrl, content, headers, success, error);
        },

        acceptChallenge: function (id, success, error) {
            var actionUrl = '/api/Challenge/Accept/' + id;
            var content = '';
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        },

        likeChallenge: function(id, success, error) {
            var actionUrl = '/api/Votes/Like/' + id;
            var content = '';
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        }, 

        dislikeChallenge: function(id, success, error) {
            var actionUrl = '/api/Votes/Dislike/' + id;
            var content = '';
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        }
    };

    return userService;
})();

exports.addChallenge = userService.addChallenge;
exports.acceptChallenge = userService.acceptChallenge;
exports.getCompletedChallenges = userService.getCompletedChallenges;
exports.dislikeChallenge = userService.dislikeChallenge;
exports.likeChallenge = userService.likeChallenge;
