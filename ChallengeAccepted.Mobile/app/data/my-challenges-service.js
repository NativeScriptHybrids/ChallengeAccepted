var http = require("http");
var httpRequester = require("~/data/http-requester");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var MyChallengesService = (function () {

    var MyChallengesService = {

        getActiveChallenges: function register(success, error) {
            var actionUrl = 'api/ChallengeResponse/GetCurrentUserActive';

            return httpRequester.authGet(actionUrl, success, error);
        },

        getCompletedChallenges: function (success, error) {
            var actionUrl = 'api/ChallengeResponse/GetCurrentUserCompleted';

            return httpRequester.authGet(actionUrl, success, error);
        },

        getCreatedChallenges: function(success, error) {
            var actionUrl = 'api/Challenge/GetCurrentUserCreated';

            return httpRequester.authGet(actionUrl, success, error);
        }
    };

    return MyChallengesService;
})();

exports.getActiveChallenges = MyChallengesService.getActiveChallenges;
exports.getCompletedChallenges = MyChallengesService.getCompletedChallenges;
exports.getCreatedChallenges = MyChallengesService.getCreatedChallenges;
