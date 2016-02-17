'use strict';

var observable = require("data/observable");

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);

    function MainViewModel() {
        _super.call(this);

        return this;
    }

    MainViewModel.prototype.toRegister = function () {

    }

    MainViewModel.prototype.toLogin = function () {

    }

    return MainViewModel;
}(observable.Observable));

exports.MainViewModel = MainViewModel;