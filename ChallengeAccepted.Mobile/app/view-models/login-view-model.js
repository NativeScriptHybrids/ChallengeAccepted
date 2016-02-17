'use strict';

var observable = require("data/observable");
var validationModule = require("~/common/validate");

//var LoginViewModel = new observable.Observable({
//    "email": '',
//    "password": ''
//});
//
//var loginAction = function() {
//
//    console.log('tap action');
//    return loginAction;
//};
//
//exports.loginViewModel = LoginViewModel;
//exports.loginAction = loginAction;

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

    return LoginViewModel;
}(observable.Observable));

exports.LoginViewModel = LoginViewModel;
//exports.loginAction = loginAction;

//var observable = require("data/observable");
//var HelloWorldModel = (function (_super) {
//    __extends(HelloWorldModel, _super);
//    function HelloWorldModel() {
//        _super.call(this);
//        this.counter = 42;
//        this.set("message", this.counter + " taps left");
//    }
//    HelloWorldModel.prototype.tapAction = function () {
//        this.counter--;
//        if (this.counter <= 0) {
//            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
//        }
//        else {
//            this.set("message", this.counter + " taps left");
//        }
//    };
//    return HelloWorldModel;
//})(observable.Observable);
//exports.HelloWorldModel = HelloWorldModel;
//exports.mainViewModel = new HelloWorldModel();
