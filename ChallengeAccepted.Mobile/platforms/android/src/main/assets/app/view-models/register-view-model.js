'use strict';

var observable = require("data/observable");
var validationModule = require("~/common/validate");
var accountServiceModule = require("~/data/account-service");

var RegisterViewModel = (function (_super) {
    __extends(RegisterViewModel, _super);

    function RegisterViewModel() {
        _super.call(this);
        this._email = '';
        this._password = '';
        this._confirmPassword = '';
        this._firstName = '';
        this._lastName = '';

        return this;
    }

    Object.defineProperty(RegisterViewModel.prototype, "email", {
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

    Object.defineProperty(RegisterViewModel.prototype, 'password', {
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

    Object.defineProperty(RegisterViewModel.prototype, 'confirmPassword', {
        get: function () {
            return this._confirmPassword;
        },
        set: function (value) {
            if (!validationModule.isValidPassword(value)) {
                throw new Error('Invalid password.');
            }

            this._confirmPassword = value;
        }
    });

    Object.defineProperty(RegisterViewModel.prototype, 'firstName', {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        }
    });

    Object.defineProperty(RegisterViewModel.prototype, 'lastName', {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        }
    });

    RegisterViewModel.prototype.registerTap = function () {
        var self = this;
        var isEmailValid = validationModule.isValidEmail(self.email);
        if (!isEmailValid) {
            alert('The email is incorrect.');
            return;
        }

        var isPasswordValid = validationModule.isValidPassword(self.password);
        var isConfirmPasswordValid = validationModule.isValidPassword(self.confirmPassword);
        if (!isPasswordValid || !isConfirmPasswordValid) {
            alert('The password is incorrect.');
            return;
        }

        if (!validationModule.passwordsMatch(self.password, self.confirmPassword)) {
            alert('The password and confirmation password do not match.');
            return;
        }

        accountServiceModule.register(self.email, self.password, self.confirmPassword);
        //alert("Signing in");

        //console.log(email);

        //if (!app.connectionApi.hasConnection()) {
        //    app.notificationsApi.beep(1);
        //    app.notifier.error('Please check your connection before register...');
        //    return;
        //}

        //app.auth.register(email, password, confirmPassword).then(function(data) {
        //    app.notifier.success('Registered');
        //    app.main.navigate('views/login/login.html');
        //}, app.errorHandler);
    };

    return RegisterViewModel;
}(observable.Observable));

exports.RegisterViewModel = RegisterViewModel;
//exports.mainViewModel = new RegisterViewModel();
//
//var RegisterViewModel = new observable.Observable({
//    "email": '',
//    "password": '',
//    "confirmPassword": '',
//    "firstName": '',
//    "lastName": ''
//});
//
//var registerAction = function() {
//
//    console.log('tap action');
//    return registerAction;
//};
//
//exports.registerViewModel = RegisterViewModel;
//exports.registerAction = registerAction;