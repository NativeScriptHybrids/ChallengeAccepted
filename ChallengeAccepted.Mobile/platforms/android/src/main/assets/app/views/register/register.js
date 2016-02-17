'use strict';

var vmModule  = require("./../../view-models/register-view-model");
var helperModule = require("~/common/helper");
var buttonModule = require("ui/button");
var view = require("ui/core/view");

var pageModules = (function() {

    //var topmost;
    var viewModel,
        segmentedBar,
        registerButton;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = new vmModule.RegisterViewModel();
            page.bindingContext = viewModel;

            segmentedBar = view.getViewById(page, 'register-segmented-bar');
            segmentedBar.selectedIndex = 0;

            registerButton = view.getViewById(page, 'register-button');

            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 1){
                viewModel.toMain();
            }else if (segmentedBar.selectedIndex === 2){
                viewModel.toLogin();
            }
        });

        registerButton.on(buttonModule.Button.tapEvent, function (args) {
            viewModel.registerTap()
                .then(helperModule.navigateAnimated("./views/login/login"));
        });
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;