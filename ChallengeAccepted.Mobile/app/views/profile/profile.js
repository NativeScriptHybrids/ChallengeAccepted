'use strict';

var vmModule  = require("./../../view-models/profile-view-model");
var helperModule = require("~/common/helper");
var buttonModule = require("ui/button");
var view = require("ui/core/view");
var accountServiceModule = require("~/data/account-service");

var pageModules = (function() {

    //var topmost;
    var viewModel,
        segmentedBar,
        challengesSegmentedBar,
        registerButton;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = new vmModule.ProfileViewModel();
            page.bindingContext = viewModel;

            segmentedBar = view.getViewById(page, 'profile-segmented-bar');
            segmentedBar.selectedIndex = 2;

            challengesSegmentedBar = view.getViewById(page, 'profile-challenges-segmented-bar');
            challengesSegmentedBar.selectedIndex = 2;
            //registerButton = view.getViewById(page, 'register-button');

            accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError);
            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 0){
               // viewModel.toMain();
            }else if (segmentedBar.selectedIndex === 1){
               // viewModel.toLogin();
            }else if (segmentedBar.selectedIndex === 3){
                // viewModel.toLogin();
            }else if (segmentedBar.selectedIndex === 4){
                // viewModel.toLogin();
            }
        });

        challengesSegmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 0){
                // viewModel.toMain();
            }else if (segmentedBar.selectedIndex === 1){
                // viewModel.toLogin();
            }else if (segmentedBar.selectedIndex === 3){
                // viewModel.toLogin();
            }else if (segmentedBar.selectedIndex === 4){
                // viewModel.toLogin();
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