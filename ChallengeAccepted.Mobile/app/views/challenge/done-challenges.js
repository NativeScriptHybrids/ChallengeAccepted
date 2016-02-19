'use strict';

var vmModule = require("./../../view-models/done-challenges-model");
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
            segmentedBar.selectedIndex = 3;

            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(segmentedBar);
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;

