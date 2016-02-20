'use strict';

var vmModule = require("./../../view-models/my-added-challenges-model");
var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");

var pageModules = (function() {

    var viewModel,
        topSegmentedBar,
        bottomSegmentedBar;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = vmModule.MyAddedChallengesModel;
            page.bindingContext = viewModel;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 3;

            attachEvents();
        },

        viewChallenge: function(args){
            vmModule.viewChallenge(args);
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    return pageModules;
})();

exports.viewChallenge = pageModules.viewChallenge;
exports.pageLoaded = pageModules.pageLoaded;

