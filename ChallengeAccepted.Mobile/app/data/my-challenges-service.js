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
        },

        getAddedChallengeDetails: function(id, success, error) {
            var actionUrl = 'api/Challenge/Details/' + id;

            return httpRequester.authGet(actionUrl, success, error);
        },

        getChallengeResponseDetails: function(id, success, error) {
            var actionUrl = 'api/ChallengeResponse/Details/' + id;

            return httpRequester.authGet(actionUrl, success, error);
        },

        uploadImage: function(photo, success, error) {
            var actionUrl = 'api/Image/UploadPhoto';

            return httpRequester.authPost(actionUrl, photo, success, error);
        }
    };

    return MyChallengesService;
})();

exports.getActiveChallenges = MyChallengesService.getActiveChallenges;
exports.getCompletedChallenges = MyChallengesService.getCompletedChallenges;
exports.getCreatedChallenges = MyChallengesService.getCreatedChallenges;
exports.getAddedChallengeDetails = MyChallengesService.getAddedChallengeDetails;
exports.getChallengeResponseDetails = MyChallengesService.getChallengeResponseDetails;
exports.uploadImage = MyChallengesService.uploadImage;