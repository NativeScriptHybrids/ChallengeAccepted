'use strict';

var vmModule = require("./../view-models/main-view-model");
var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var accountServiceModule = require("~/data/account-service");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var pageModules = (function() {

    var viewModel,
        segmentedBar;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = new vmModule.MainViewModel();
            page.bindingContext = viewModel;

            segmentedBar = view.getViewById(page, "main-segmented-bar");
            segmentedBar.selectedIndex = 1;

            //AppSettings.setString(globalConstants.LocalStorageTokenKey, '');
            //AppSettings.setString(globalConstants.LocalStorageUsernameKey, '');

            attachEvents();

            // TODO: change to another page
            if (accountServiceModule.isAuthenticated()){
                helperModule.navigate("./views/account/profile");
            }
        }
    };

    function attachEvents(){
        segmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 0){
                viewModel.toRegister();
            }else if (segmentedBar.selectedIndex === 2){
                viewModel.toLogin();
            }
        });
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;