'use strict';

var vmModule = require("./../../view-models/main-view-model");
var helperModule = require("~/common/helper");
var view = require("ui/core/view");

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

            attachEvents();
        }
    }

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