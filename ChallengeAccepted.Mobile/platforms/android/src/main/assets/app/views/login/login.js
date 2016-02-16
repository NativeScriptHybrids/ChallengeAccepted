var vmModule = require("./login-view-model");
var helperModule = require("~/common/helper-methods");
//var frameModule = require("ui/frame");
//var topmost = frameModule.topmost();
var view = require("ui/core/view");
//var http = require("http");

var pageModules = (function() {

    //var topmost;
    var segmentedBar;

    var pageModules = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            //page.bindingContext = vmModule.mainViewModel;
            // topmost = frameModule.topmost();

            segmentedBar = view.getViewById(page, "login-segmented-bar");
            segmentedBar.selectedIndex = 2;
            attachEvents();
        },

        toRegister: function() {
            helperModule.navigateAnimated("./views/register/register");
        },
        toMain: function() {
            helperModule.navigateAnimated("./views/main/main");
        }
    }

    function attachEvents(){
        segmentedBar.on('propertyChange', function(){
            if (segmentedBar.selectedIndex === 0){
                pageModules.toRegister();
            }else if (segmentedBar.selectedIndex === 1){
                pageModules.toMain();
            }
        });
    }

    return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
exports.toRegister = pageModules.toRegister;
exports.toLogin = pageModules.toLogin;
exports.toMain = pageModules.toMain;