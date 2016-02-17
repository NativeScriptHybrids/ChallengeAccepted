'use strict';

var observable = require("data/observable");
var helperModule = require("~/common/helper");

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);

    function MainViewModel() {
        _super.call(this);

        return this;
    }

    MainViewModel.prototype = {

        toRegister: function () {
            helperModule.navigateAnimated("./views/register/register");
        },

        toLogin: function () {
            helperModule.navigateAnimated("./views/login/login");
        }
    };

    return MainViewModel;
}(observable.Observable));

exports.MainViewModel = MainViewModel;