'use strict';

var observable = require("data/observable");
var validationModule = require("~/common/validate");
var accountServiceModule = require("~/data/account-service");
var helperModule = require("~/common/helper");

var ProfileViewModel = new observable.Observable();

accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError);

function getProfileSuccess(response) {
    mapResponseToViewModel(response);
    //console.log('success', JSON.stringify(response));
    //console.log(JSON.stringify(self));
}

function mapResponseToViewModel(response){
    ProfileViewModel.set('username', response.content.toJSON()['Username']);
    ProfileViewModel.set('email', response.content.toJSON()['Email']);

    var firstName = response.content.toJSON()['FirstName'] || '';
    var lastName = response.content.toJSON()['FirstName'] || '';

    ProfileViewModel.set('firstName', firstName);
    ProfileViewModel.set('lastName', lastName);
    var fullName = (ProfileViewModel.get('firstName') + ' ' + ProfileViewModel.get('lastName')).trim() || 'no name added'
    ProfileViewModel.set('fullName', fullName);

    var imageUrl = response.content.toJSON()['ImageUrl'] || '~/images/default-profile-img.jpg';
    ProfileViewModel.set('imageUrl', imageUrl);

    //ProfileViewModel.set('location', response.content.toJSON()['Location']);
    ProfileViewModel.set('score', response.content.toJSON()['Score']);
    ProfileViewModel.set('createdChallenges', response.content.toJSON()['CreatedChallenges']);
    ProfileViewModel.set('challengeResponses', response.content.toJSON()['ChallengeResponses']);
    ProfileViewModel.set('badges', response.content.toJSON()['Badges']);

    //console.log('in model ' + response.content.toJSON()['Score']);
    //console.log(ProfileViewModel.get('email'));
}
//
//var ProfileViewModel = (function (_super) {
//    __extends(ProfileViewModel, _super);
//var self;
//    function ProfileViewModel() {
//        _super.call(this);
//        this._username = '';
//        this._email = '';
//        this._imageUrl = '';
//        this._location = {
//            latitude: '',
//            longitude: ''
//        };
//        this._firstName = '';
//        this._lastName = '';
//        this._score = 0;
//self = this;
//        this.bla = 'bla';
//
//        accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError);
//
//        return this;
//    }
//
//    Object.defineProperty(ProfileViewModel.prototype, "username", {
//        get: function () {
//            return this._username;
//        },
//        set: function (value) {
//            this._username = value;
//            this.notifyPropertyChange("username", value);
//            console.log('in porp ' + value);
//        }
//    });
//
//    Object.defineProperty(ProfileViewModel.prototype, "email", {
//        get: function () {
//            return this._email;
//        },
//        set: function (value) {
//            this._email = value;
//            this.notifyPropertyChange("email", value);
//        }
//    });
//
//    Object.defineProperty(ProfileViewModel.prototype, 'firstName', {
//        get: function () {
//            return this._firstName;
//        },
//        set: function (value) {
//            this._firstName = value;
//        }
//    });
//
//    Object.defineProperty(ProfileViewModel.prototype, 'lastName', {
//        get: function () {
//            return this._lastName;
//        },
//        set: function (value) {
//            this._lastName = value;
//        }
//    });
//
//    Object.defineProperty(ProfileViewModel.prototype, 'imageUrl', {
//        get: function () {
//            return this._imageUrl;
//        },
//        set: function (value) {
//            this._imageUrl = value;
//        }
//    });
//
//    Object.defineProperty(ProfileViewModel.prototype, 'location', {
//        get: function () {
//            return this._location;
//        },
//        set: function (value) {
//            this._location = value;
//        }
//    });
//
//    Object.defineProperty(ProfileViewModel.prototype, 'score', {
//        get: function () {
//            return this._score;
//        },
//        set: function (value) {
//            this._score = value;
//        }
//    });
//
//
//    ProfileViewModel.prototype = {
//
//        //get: function(){
//        //    return accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError).then(function(response){
//        //            self.lastName = response.content.toJSON()['LastName'];
//        //            self.username.set(response.content.toJSON()['Username']);
//        //            console.log(self.bla);
//        //            self.email = response.content.toJSON()['Email'];
//        //            //ProfileViewModel.set('email', response.content.toJSON()['Email']);
//        //            self.imageUrl = response.content.toJSON()['ImageUrl'];
//        //            self.location = response.content.toJSON()['Location'];
//        //            self.score = response.content.toJSON()['Score'];
//        //
//        //            return self;
//        //        }
//        //    );
//        //},
//
//    //    refresh: function () {
//    //    this.execute(this.username.reload());
//    //};
//
//        //registerTap: function () {
//        //    var self = this;
//        //    var isEmailValid = validationModule.isValidEmail(self.email);
//        //    if (!isEmailValid) {
//        //        alert('The email is incorrect.');
//        //        return;
//        //    }
//        //
//        //    var isPasswordValid = validationModule.isValidPassword(self.password);
//        //    var isConfirmPasswordValid = validationModule.isValidPassword(self.confirmPassword);
//        //    if (!isPasswordValid || !isConfirmPasswordValid) {
//        //        alert('The password is incorrect.');
//        //        return;
//        //    }
//        //
//        //    if (!validationModule.passwordsMatch(self.password, self.confirmPassword)) {
//        //        alert('The password and confirmation password do not match.');
//        //        return;
//        //    }
//        //
//        //    return accountServiceModule.register(self, registerSuccess, helperModule.handleHttpRequestError);
//        //    //alert("Signing in");
//        //    //console.log(email);
//        //
//        //    //if (!app.connectionApi.hasConnection()) {
//        //    //    app.notificationsApi.beep(1);
//        //    //    app.notifier.error('Please check your connection before register...');
//        //    //    return;
//        //    //}
//        //},
//        //
//        //toLogin: function () {
//        //    helperModule.navigateAnimated("./views/login/login");
//        //},
//        //
//        //toMain: function () {
//        //    helperModule.navigateAnimated("./views/main");
//        //}
//    };
//
//    //function registerSuccess(response) {
//    //    helperModule.notify('Successfully registered!');
//    //    helperModule.navigateAnimated("./views/login/login");
//    //}
//    //
//    //function getProfileSuccess(response) {
//    //    return response;
//    //    //mapResponseToViewModel(response);
//    //    //console.log('success', JSON.stringify(response));
//    //    //console.log(JSON.stringify(self));
//    //}
//    //
//    //function mapResponseToViewModel(response){
//    //    //self.firstName.set(response.content.toJSON()['FirstName']);
//    //    //ProfileViewModel.set('firstName', response.content.toJSON()['FirstName']);
//    //    self.lastName = response.content.toJSON()['LastName'];
//    //    self.username.set(response.content.toJSON()['Username']);
//    //    console.log(self.bla);
//    //    self.email = response.content.toJSON()['Email'];
//    //    //ProfileViewModel.set('email', response.content.toJSON()['Email']);
//    //    self.imageUrl = response.content.toJSON()['ImageUrl'];
//    //    self.location = response.content.toJSON()['Location'];
//    //    self.score = response.content.toJSON()['Score'];
//    //
//    //    return self;
//    //}
//    return ProfileViewModel;
//}(observable.Observable));
////
////accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError)
////function getProfileSuccess(response) {
////    mapResponseToViewModel(response);
////    console.log('success', JSON.stringify(response));
////}
////
////function mapResponseToViewModel(response){
////    //ProfileViewModel.set('firstName', response.content.toJSON()['FirstName']);
////    //ProfileViewModel.lastName = response.content.toJSON()['LastName'];
////    //ProfileViewModel.username = response.content.toJSON()['Username'];
////    ProfileViewModel.set('email', response.content.toJSON()['Email']);
////    //ProfileViewModel.imageUrl = response.content.toJSON()['ImageUrl'];
////    //ProfileViewModel.location = response.content.toJSON()['Location'];
////    //ProfileViewModel.score = response.content.toJSON()['Score'];
////
////    //return ProfileViewModel;
////}
exports.ProfileViewModel = ProfileViewModel;