var http = require("http");
var httpRequester = require("~/data/http-requester");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var MyChallengesService = (function () {

    var MyChallengesService = {

        getActiveChallenges: function register(registerViewModel, success, error) {
            var actionUrl = 'api/Profile/Get';

            var profile =  httpRequester.authGet(actionUrl, success, error);

            var actionUrl = 'api/Account/Register';
            return httpRequester.authGet(actionUrl, success, error);
            var actionUrl = 'api/Account/Register';
            var content = "Email=" + registerViewModel.email + "&Password=" + registerViewModel.password + "&ConfirmPassword=" + registerViewModel.confirmPassword;
            var headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        },

        login: function (loginViewModel, success, error) {
            var actionUrl = 'Token';
            var content = "grant_type=password&username=" + loginViewModel.email + "&password=" + loginViewModel.password;
            var headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        },

        logout: function() {
            AppSettings.setString(globalConstants.LocalStorageTokenKey, '');
            AppSettings.setString(globalConstants.LocalStorageUsernameKey, '');
        },

        isAuthenticated: function() {
            if (AppSettings.getString(globalConstants.LocalStorageTokenKey)){
                return true;
            }

            return false;
        },

        getProfile: function(success, error){
            var actionUrl = 'api/Profile/Get';

            return httpRequester.authGet(actionUrl, success, error);
        }
    };

    return MyChallengesService;
})();

exports.register = MyChallengesService.register;
exports.login = MyChallengesService.login;
exports.logout = MyChallengesService.logout;
