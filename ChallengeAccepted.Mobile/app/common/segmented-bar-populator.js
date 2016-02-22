var frameModule = require("ui/frame");
var helperModule = require("~/common/helper");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var accountServiceModule = require("~/data/account-service");

var SegmentedBarPopulatorModule = (function() {

    var SegmentedBarPopulatorModule = {

        populateProfileBottomSegmentedBar: function populateProfileBottomSegmentedBar(segmentedBar){
            segmentedBar.on('propertyChange', function(){
                if (segmentedBar.selectedIndex === 0){
                    console.log('here');
                    helperModule.navigate("./views/challenge/add-challenge");
                } else if (segmentedBar.selectedIndex === 1){ //Pick
                    helperModule.navigate("./views/challenge/challenge-to-pick");
                } else if (segmentedBar.selectedIndex === 2){ //Profile
                    helperModule.navigate("./views/profile/profile");
                } else if (segmentedBar.selectedIndex === 3){ //Peek / Browse / Rate
                    console.log('peek');
                    helperModule.navigate("./views/challenge/done-challenges");
                } else if (segmentedBar.selectedIndex === 4){ //LogOut
                    accountServiceModule.logout();
                    helperModule.navigate("./views/main");
                }
            });
        },

        populateProfileTopSegmentedBar: function populateProfileTopSegmentedBar(segmentedBar){
            segmentedBar.on('propertyChange', function(){
                if (segmentedBar.selectedIndex === 0){
                    helperModule.navigate("./views/profile/my-active-challenges", {});
                } else if (segmentedBar.selectedIndex === 1){
                    helperModule.navigate("./views/profile/my-done-challenges");
                }else if (segmentedBar.selectedIndex === 2){
                    helperModule.navigate("./views/profile/profile");
                }else if (segmentedBar.selectedIndex === 3){
                    helperModule.navigate("./views/profile/my-added-challenges");
                }else if (segmentedBar.selectedIndex === 4){
                    helperModule.navigate("./views/profile/my-badges");
                }
            });
        }
    };

    return SegmentedBarPopulatorModule;
})();

exports.populateProfileBottomSegmentedBar = SegmentedBarPopulatorModule.populateProfileBottomSegmentedBar;
exports.populateProfileTopSegmentedBar = SegmentedBarPopulatorModule.populateProfileTopSegmentedBar;