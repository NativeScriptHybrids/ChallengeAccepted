'use strict';

var vmModule  = require("./../../view-models/profile-view-model");
var helperModule = require("~/common/helper");
var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var layout = require("ui/layouts/grid-layout");
var view = require("ui/core/view");
var accountServiceModule = require("~/data/account-service");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");
var connectionChecker = require("~/common/connection-checker");
var profileServiceSQLite = require("~/database/profile-service");

var pageModules = (function() {

    //var topmost;
    var viewModel,
        topSegmentedBar,
        bottomSegmentedBar,
        nameLabel,
        grid,
        registerButton;

    var pageModules = {


    //    pageNavigatingTo: function(args) {
    //        var page = args.object;
    //        viewModel = new vmModule.ProfileViewModel();
    //        page.bindingContext = viewModel;
    //        bottomSegmentedBar = view.getViewById(page, 'profile-segmented-bar');
    //        bottomSegmentedBar.selectedIndex = 2;
    //
    //        topSegmentedBar = view.getViewById(page, 'profile-challenges-segmented-bar');
    //        topSegmentedBar.selectedIndex = 2;
    //        //accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError);
    //},
        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;

            viewModel = vmModule.ProfileViewModel;
            page.bindingContext = viewModel;

            bottomSegmentedBar = view.getViewById(page, 'profile-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'profile-challenges-segmented-bar');
            topSegmentedBar.selectedIndex = 2;

            var username = AppSettings.getString(globalConstants.LocalStorageUsernameKey);
            var imageUrl = 'testurl1';

            ////TODO: move to edit or image select
            //profileServiceSQLite.Profile.addProfile(username, imageUrl);
            //console.log('opaaa ', JSON.stringify(profileServiceSQLite.Profile.getProfile(username)));

            //connectionChecker.getConnection();

            //registerButton = view.getViewById(page, 'register-button');

            //accountServiceModule.getProfile(getProfileSuccess, helperModule.handleHttpRequestError);
            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);

        //registerButton.on(buttonModule.Button.tapEvent, function (args) {
        //    viewModel.registerTap();
        //});
    }

//    function getProfileSuccess(response) {
//        //Store in local storage
//        viewModel.mapResponseToViewModel(response);
//        //pageModules.pageLoaded();
//        //    .firstName = response.content.toJSON()['FirstName'];
//        //viewModel.lastName = response.content.toJSON()['LastName'];
//        //viewModel.username = response.content.toJSON()['Username'];
//console.log(viewModel.username);
//        console.log('success', JSON.stringify(response));
//
//        //todo to view model function in view model - return new and populate labels
//    }

    return pageModules;
})();
//exports.pageNavigatingTo = pageModules.pageNavigatingTo;
exports.pageLoaded = pageModules.pageLoaded;