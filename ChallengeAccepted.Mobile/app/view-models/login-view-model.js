'use strict';

var observable = require("data/observable");
var validationModule = require("~/common/validate");
var accountServiceModule = require("~/data/account-service");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var helperModule = require("~/common/helper");

//https://github.com/NativeScript/sample-Friends/blob/master/app/view-models/sign-up-view-model.js
var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);

    function LoginViewModel() {
        _super.call(this);
        this._email = '';
        this._password = '';

        return this;
    }

    Object.defineProperty(LoginViewModel.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            if (!validationModule.isValidEmail(value)) {
                throw new Error('Invalid email.');
            }
            this._email = value.toLowerCase();
        }
    });

    Object.defineProperty(LoginViewModel.prototype, 'password', {
        get: function () {
            return this._password;
        },
        set: function (value) {
            if (!validationModule.isValidPassword(value)) {
                throw new Error('Invalid password.');
            }

            this._password = value;
        }
    });

    LoginViewModel.prototype = {
        loginTap: function () {
            var self = this;
            var isEmailValid = validationModule.isValidEmail(self.email);
            if (!isEmailValid) {
                helperModule.notify('The email is incorrect.');
                return;
            }

            var isPasswordValid = validationModule.isValidPassword(self.password);
            if (!isPasswordValid) {
                helperModule.notify('The password is incorrect.');
                return;
            }

            return accountServiceModule.login(self, loginSuccess, helperModule.handleHttpRequestError);
        },

        toRegister: function() {
            helperModule.navigateAnimated("./views/account/register");
        },

        toMain: function() {
            helperModule.navigateAnimated("./views/main");
        }
    };

    function loginSuccess(response) {
        //Store in local storage
        var token = response.content.toJSON()['access_token'];
        var username = response.content.toJSON()['userName'];

        AppSettings.setString(globalConstants.LocalStorageTokenKey, token);
        AppSettings.setString(globalConstants.LocalStorageUsernameKey, username);
        //console.log('success', JSON.stringify(response));

        helperModule.notify('Logged in!');

        helperModule.navigateAnimated("./views/profile/profile");
    }

    return LoginViewModel;
}(observable.Observable));

exports.LoginViewModel = LoginViewModel;
