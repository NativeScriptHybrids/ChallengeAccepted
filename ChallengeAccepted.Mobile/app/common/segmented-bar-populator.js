var frameModule = require("ui/frame");
var helperModule = require("~/common/helper");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");

var SegmentedBarPopulatorModule = (function() {

    var SegmentedBarPopulatorModule = {

        populateProfileBottomSegmentedBar: function populateProfileBottomSegmentedBar(segmentedBar){
            segmentedBar.on('propertyChange', function(){
                if (segmentedBar.selectedIndex === 0){
                    console.log('here');
                    //helperModule.navigate("./views/add-challenge/add-challengee");
                } else if (segmentedBar.selectedIndex === 1){ //Pick
                    helperModule.navigate("./views/challenge/challenge-to-pick");
                }else if (segmentedBar.selectedIndex === 2){ //Profile
                    helperModule.navigate("./views/profile/profile");
                }else if (segmentedBar.selectedIndex === 3){ //Peek / Browse
                    console.log('peek');
                    helperModule.navigate("./views/challenge/done-challenges");
                }else if (segmentedBar.selectedIndex === 4){ //LogOut
                    AppSettings.setString(globalConstants.LocalStorageTokenKey, '');
                    AppSettings.setString(globalConstants.LocalStorageUsernameKey, '');

                    helperModule.navigate("./views/main");
                }
            });
        }
    };

    return SegmentedBarPopulatorModule;
})();

exports.populateProfileBottomSegmentedBar = SegmentedBarPopulatorModule.populateProfileBottomSegmentedBar;