'use strict';

var vmModule = require("./../../view-models/my-active-challenges-model");
var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");

var pageModules = (function() {

    var viewModel,
        topSegmentedBar,
        bottomSegmentedBar,
        page;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            page = args.object;
            viewModel = vmModule.MyActiveChallengesModel;
            page.bindingContext = viewModel;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 0;

            attachEvents();

            animateListView();
        },

        viewChallenge: function(args){
            vmModule.viewChallenge(args);
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    function animateListView(){
        view.getViewById(page, "active-challenges").animate({
            opacity: 1,
            duration: 10000
        });
    }

    return pageModules;
})();

exports.viewChallenge = pageModules.viewChallenge;
exports.pageLoaded = pageModules.pageLoaded;


