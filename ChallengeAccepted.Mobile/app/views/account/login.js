'use strict';

var vmModule = require("./../../view-models/login-view-model");
var helperModule = require("~/common/helper");
var buttonModule = require("ui/button");
//var frameModule = require("ui/frame");
//var topmost = frameModule.topmost();
var view = require("ui/core/view");
//var http = require("http");

var pageModules = (function() {

    //var topmost;
    var viewModel,
        segmentedBar,
        loginButton;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = new vmModule.LoginViewModel();
            page.bindingContext = viewModel;
            // topmost = frameModule.topmost();

            segmentedBar = view.getViewById(page, "login-segmented-bar");
            segmentedBar.selectedIndex = 2;

            loginButton = view.getViewById(page, 'login-button');

            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 0){
                viewModel.toRegister();
            }else if (segmentedBar.selectedIndex === 1){
                viewModel.toMain();
            }
        });

        loginButton.on(buttonModule.Button.tapEvent, function (args) {
            //console.log(args);
            viewModel.loginTap();
        });
    }

    return pageModules; 
})();

exports.pageLoaded = pageModules.pageLoaded;