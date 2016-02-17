'use strict';

var observable = require("data/observable");
var validationModule = require("~/common/validate");
var accountServiceModule = require("~/data/account-service");
var helperModule = require("~/common/helper");

var ProfileViewModel = (function (_super) {
    __extends(ProfileViewModel, _super);

    function ProfileViewModel() {
        _super.call(this);
        this._email = '';
        this._imageUrl = '';
        this._location = {
            latitude: '',
            longitude: ''
        };
        this._firstName = '';
        this._lastName = '';
        this._score = 0;

        return this;
    }

    Object.defineProperty(ProfileViewModel.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            return;
        }
    });

    Object.defineProperty(ProfileViewModel.prototype, 'firstName', {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        }
    });

    Object.defineProperty(ProfileViewModel.prototype, 'lastName', {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        }
    });

    Object.defineProperty(ProfileViewModel.prototype, 'imageUrl', {
        get: function () {
            return this._imageUrl;
        },
        set: function (value) {
            this._imageUrl = value;
        }
    });

    Object.defineProperty(ProfileViewModel.prototype, 'location', {
        get: function () {
            return this._location;
        },
        set: function (value) {
            this._location = value;
        }
    });

    Object.defineProperty(ProfileViewModel.prototype, 'score', {
        get: function () {
            return this._score;
        },
        set: function (value) {
            this._score = value;
        }
    });


    ProfileViewModel.prototype = {

        //registerTap: function () {
        //    var self = this;
        //    var isEmailValid = validationModule.isValidEmail(self.email);
        //    if (!isEmailValid) {
        //        alert('The email is incorrect.');
        //        return;
        //    }
        //
        //    var isPasswordValid = validationModule.isValidPassword(self.password);
        //    var isConfirmPasswordValid = validationModule.isValidPassword(self.confirmPassword);
        //    if (!isPasswordValid || !isConfirmPasswordValid) {
        //        alert('The password is incorrect.');
        //        return;
        //    }
        //
        //    if (!validationModule.passwordsMatch(self.password, self.confirmPassword)) {
        //        alert('The password and confirmation password do not match.');
        //        return;
        //    }
        //
        //    return accountServiceModule.register(self, registerSuccess, helperModule.handleHttpRequestError);
        //    //alert("Signing in");
        //    //console.log(email);
        //
        //    //if (!app.connectionApi.hasConnection()) {
        //    //    app.notificationsApi.beep(1);
        //    //    app.notifier.error('Please check your connection before register...');
        //    //    return;
        //    //}
        //},
        //
        //toLogin: function () {
        //    helperModule.navigateAnimated("./views/login/login");
        //},
        //
        //toMain: function () {
        //    helperModule.navigateAnimated("./views/main/main");
        //}
    };

    //function registerSuccess(response) {
    //    helperModule.notify('Successfully registered!');
    //    helperModule.navigateAnimated("./views/login/login");
    //}

    return ProfileViewModel;
}(observable.Observable));

exports.ProfileViewModel = ProfileViewModel;