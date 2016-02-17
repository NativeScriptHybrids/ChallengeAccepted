var http = require("http");
var httpRequester = require("~/data/http-requester");

var AccountService = (function () {

    var AccountService = {

        register: function register(email, password, confirmPassword, success, error) {
            var actionUrl = 'api/Account/Register';
            var content = "Email=" + email + "&Password=" + password + "&ConfirmPassword=" + confirmPassword;
            var headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        },

        login: function (email, password, success, error) {
            var actionUrl = 'Token';
            var content = "grant_type=password&username=" + email + "&password=" + password;
            var headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

            return httpRequester.post(actionUrl, content, headers, success, error);
        }
    };

    return AccountService;
})();

exports.register = AccountService.register;
exports.login = AccountService.login;
