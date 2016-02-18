'use strict';

var vmModule  = require("./../../view-models/profile-view-model");
var helperModule = require("~/common/helper");
var buttonModule = require("ui/button");
var view = require("ui/core/view");
var accountServiceModule = require("~/data/account-service");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var pageModules = (function() {

    //var topmost;
    var viewModel,
        topSegmentedBar,
        bottomSegmentedBar,
        registerButton;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            console.log('Navigation Context: ' + JSON.stringify(page.navigationContext));
            viewModel = new vmModule.ProfileViewModel();
            page.bindingContext = viewModel;

            bottomSegmentedBar = view.getViewById(page, 'profile-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'profile-challenges-segmented-bar');
            topSegmentedBar.selectedIndex = 2;
            //registerButton = view.getViewById(page, 'register-button');

            accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError);
            attachEvents();
        }
    };

    function attachEvents(){
        topSegmentedBar.on('propertyChange', function(){
            if (topSegmentedBar.selectedIndex === 0){
               // viewModel.toMain();
            }else if (topSegmentedBar.selectedIndex === 1){
               // viewModel.toLogin();
            }else if (topSegmentedBar.selectedIndex === 2){
                // viewModel.toLogin();
            }else if (topSegmentedBar.selectedIndex === 3){
                // viewModel.toLogin();
            }else if (topSegmentedBar.selectedIndex === 4){
                // viewModel.toLogin();
            }
        });

        bottomSegmentedBar.on('propertyChange', function(){
            if (bottomSegmentedBar.selectedIndex === 0){ //Add
                // viewModel.toMain();
            }else if (bottomSegmentedBar.selectedIndex === 1){ //Pick
                helperModule.navigate("./views/challenge/challenge-to-pick");
            }else if (bottomSegmentedBar.selectedIndex === 3){ //Profile
                
            }else if (bottomSegmentedBar.selectedIndex === 4){ //LogOut
                AppSettings.setString(globalConstants.LocalStorageTokenKey, '');
                AppSettings.setString(globalConstants.LocalStorageUsernameKey, '');

                helperModule.navigate("./views/main/main");
            }
        });

        //registerButton.on(buttonModule.Button.tapEvent, function (args) {
        //    viewModel.registerTap();
        //});
    }

    function getProfileSuccess(response) {
        //Store in local storage
        var firstName = response.content.toJSON()['firstName'];
        var lastName = response.content.toJSON()['lastName'];

        console.log('success', JSON.stringify(response));
        //todo to view model function in view model - return new and populate labels
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;