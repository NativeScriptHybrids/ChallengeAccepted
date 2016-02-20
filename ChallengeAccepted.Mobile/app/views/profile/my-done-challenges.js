'use strict';

var vmModule = require("./../../view-models/my-done-challenges-model");
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
            viewModel = vmModule.AddChallengeModel;
            page.bindingContext = viewModel;

            bottomSegmentedBar = view.getViewById(page, 'profile-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'profile-challenges-segmented-bar');
            topSegmentedBar.selectedIndex = 2;

            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;

