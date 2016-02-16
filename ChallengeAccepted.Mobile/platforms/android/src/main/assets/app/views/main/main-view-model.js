var observable = require("data/observable");

var counterPropName = 'counter';
var messagePropName = 'message';

var HelloWorldModel = new observable.Observable();

HelloWorldModel.set(counterPropName, 42);
HelloWorldModel.set(messagePropName, HelloWorldModel.get(counterPropName) + ' taps left');

var tapAction = function() {
    //HelloWorldModel.set(counterPropName, HelloWorldModel.get(counterPropName) - 1);
    //var currentCount = HelloWorldModel.get(counterPropName);
    //if (currentCount <= 0) {
    //    HelloWorldModel.set(messagePropName, "Hello NativeScript");
    //} else {
    //    HelloWorldModel.set(messagePropName, currentCount + " taps left");
    //}
console.log('tap action');
    return tapAction;
};

exports.mainViewModel = HelloWorldModel;
exports.tapAction = tapAction;
////var observable = require("data/observable");
////var HelloWorldModel = (function (_super) {
////    __extends(HelloWorldModel, _super);
////    function HelloWorldModel() {
////        _super.call(this);
////        this.counter = 42;
////        this.set("message", this.counter + " taps left");
////    }
////    HelloWorldModel.prototype.tapAction = function () {
////        this.counter--;
////        if (this.counter <= 0) {
////            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
////        }
////        else {
////            this.set("message", this.counter + " taps left");
////        }
////    };
////    return HelloWorldModel;
////})(observable.Observable);
////exports.HelloWorldModel = HelloWorldModel;
////exports.mainViewModel = new HelloWorldModel();
//
//var observable = require("data/observable");
//var frameModule = require("ui/frame");
//var topmost = frameModule.topmost();
////
////var counterPropName = 'counter';
////var messagePropName = 'message';
//
//var MainViewModel = new observable.Observable();
//
////HelloWorldModel.set(counterPropName, 42);
////HelloWorldModel.set(messagePropName, HelloWorldModel.get(counterPropName) + ' taps left');
//
//var toRegister = function() {
//    console.log('heloo');
//    var navigationEntry = {
//        moduleName: "./views/register/register",
//        // Makes the page we are navigating to to not be available on back button
//        //backstackVisible: false,
//        //context: {
//        //    info: "Passed from Main Page.",
//        //},
//        animated: true,
//        navigationTransition: {
//            transition: "flip ",
//            // duration: 380,
//            // curve: "easeIn"
//
//        },
//        // Removes all the navigation history
//        // clearHistory: true
//    };
//
//    topmost.navigate(navigationEntry);
//};
//
//var tapAction = function() {
//    console.log('tappped');
//    //HelloWorldModel.set(counterPropName, HelloWorldModel.get(counterPropName) - 1);
//    //var currentCount = HelloWorldModel.get(counterPropName);
//    //if (currentCount <= 0) {
//    //    HelloWorldModel.set(messagePropName, "Hello NativeScript");
//    //} else {
//    //    HelloWorldModel.set(messagePropName, currentCount + " taps left");
//    //}
//
//    return tapAction;
//};
//exports.mainViewModel = MainViewModel;
////exports.mainViewModel = new MainViewModel();
//
//exports.tapAction = tapAction;
//exports.toRegister = toRegister;