var vmModule  = require("./../../view-models/register-view-model");
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
        registerButton;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            viewModel = new vmModule.RegisterViewModel();
            page.bindingContext = viewModel;
            // topmost = frameModule.topmost();

            segmentedBar = view.getViewById(page, 'register-segmented-bar');
            segmentedBar.selectedIndex = 0;

            registerButton = view.getViewById(page, 'register-button');
            registerButton.on(buttonModule.Button.tapEvent, function (args) {
                //console.log(args);
                viewModel.registerTap();
            });
            attachEvents();
        },

        toLogin: function() {
            helperModule.navigateAnimated("./views/login/login");
        },
        toMain: function() {
            helperModule.navigateAnimated("./views/main/main");
        }
    }

    function attachEvents(){
        segmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 1){
                pageModules.toMain();
            }else if (segmentedBar.selectedIndex === 2){
                pageModules.toLogin();
            }
        });
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
exports.toLogin = pageModules.toLogin;
exports.toMain = pageModules.toMain;