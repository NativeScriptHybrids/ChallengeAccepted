var frameModule = require("ui/frame");

var helperMethods = (function() {

    var helperMethods = {

        navigateAnimated: function(toPagePath) {
            console.log(toPagePath);
            var navigationEntry = {
                moduleName: toPagePath,
                // Makes the page we are navigating to to not be available on back button
                //backstackVisible: false,
                //context: {
                //    info: "Passed from Main Page.",
                //},
                animated: true,
                navigationTransition: {
                    transition: "slide ",
                     duration: 380,
                     curve: "easeIn"

                },
                // Removes all the navigation history
                // clearHistory: true
            };

            var topmost = frameModule.topmost();
            topmost.navigate(navigationEntry);
        }
    }

    return helperMethods;
})();

exports.navigateAnimated = helperMethods.navigateAnimated;