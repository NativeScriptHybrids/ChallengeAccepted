'use strict';

var vmModule = require("./../../view-models/add-challenge-model");
var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");

var pageModules = (function() {

    var viewModel,
        segmentedBar;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = vmModule.AddChallengeModel;
            page.bindingContext = viewModel;

            segmentedBar = view.getViewById(page, "bottom-segmented-bar");
            segmentedBar.selectedIndex = 0;

            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(segmentedBar);
        //segmentedBar.on('propertyChange', function(){
        //    if (segmentedBar.selectedIndex === 0){
        //        helperModule.navigate("./views/challenge/add-challenge");
        //    } else if (segmentedBar.selectedIndex === 1){ //Pick
        //        helperModule.navigate("./views/challenge/challenge-to-pick");
        //    }else if (segmentedBar.selectedIndex === 2){ //Profile
        //        helperModule.navigate("./views/profile/profile");
        //    }else if (segmentedBar.selectedIndex === 3){ //Peek / Browse
        //        helperModule.navigate("./views/challenge/done-challenges");
        //    }else if (segmentedBar.selectedIndex === 4){ //LogOut
        //        AppSettings.setString(globalConstants.LocalStorageTokenKey, '');
        //        AppSettings.setString(globalConstants.LocalStorageUsernameKey, '');
        //
        //        helperModule.navigate("./views/main/main");
        //    }
        //});
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;

