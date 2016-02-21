'use strict';

var vmModule = require("./../../view-models/my-badges-model");
var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");

var pageModules = (function() {

    var viewModel,
        topSegmentedBar,
        bottomSegmentedBar,
        gridView;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = vmModule.MyBadgesModel;
            page.bindingContext = viewModel;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 4;

            gridView = view.getViewById(page, 'badges-grid-view');
            attachEvents();
        },

        getHint: function(args){
            vmModule.getHint(args);
        },

        onBadgeImageDoubleTap: function(args){
            vmModule.unlockBadge(args);
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);

        gridView.on("tap, doubleTap", function (args) {
            console.log("Event: " + args.eventName + ", sender: " + args.object);
        });
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
exports.getHint = pageModules.getHint;
exports.onBadgeImageDoubleTap = pageModules.onBadgeImageDoubleTap;
