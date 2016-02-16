var observable = require("data/observable");

var LoginViewModel = new observable.Observable({
    "email": '',
    "password": '',
    "confirmPassword": '',
    "firstName": '',
    "lastName": ''
});

var loginAction = function() {

    console.log('tap action');
    return loginAction;
};

exports.loginViewModel = LoginViewModel;
exports.loginAction = loginAction;

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
