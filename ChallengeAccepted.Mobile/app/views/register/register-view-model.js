var observable = require("data/observable");

var RegisterViewModel = new observable.Observable({
    "email": '',
    "password": '',
    "confirmPassword": '',
    "firstName": '',
    "lastName": ''
});

var registerAction = function() {

    console.log('tap action');
    return registerAction;
};

exports.registerViewModel = RegisterViewModel;
exports.registerAction = registerAction;