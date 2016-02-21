var http = require("http");
var httpRequester = require("~/data/http-requester");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var BadgeService = (function () {

    var BadgeService = {

        getBadges: function getBadges(success, error) {
            var actionUrl = 'api/Badge/Get';

            return httpRequester.authGet(actionUrl, success, error);
        },

        unlockBadge: function unlock(id, success, error) {
            var actionUrl = 'api/Badge/Unlock/' + id;

            return httpRequester.authPost(actionUrl, '', success, error);
        }
    };

    return BadgeService;
})();

exports.getBadges = BadgeService.getBadges;
exports.unlockBadge = BadgeService.unlockBadge;