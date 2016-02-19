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
            helperModule.navigateAnimated("./views/account/register");
        },

        toLogin: function () {
            helperModule.navigateAnimated("./views/account/login");
        }
    };

    return MainViewModel;
}(observable.Observable));

exports.MainViewModel = MainViewModel;