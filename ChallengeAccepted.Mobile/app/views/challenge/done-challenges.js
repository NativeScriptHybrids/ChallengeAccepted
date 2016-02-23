'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var http = require("http");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");
var userService = require("~/data/user-service");
var gridLayout = require("ui/layouts/grid-layout");

var completedChallenges = (function() {
    var completedChallengesResponse;

    var completedChallenges = new observable.Observable({
        "allCompletedChallenges": completedChallengesResponse
    });

        var topmost,
        titleLabel, 
        image, 
        descriptionLabel, 
        doneByLabel, 
        currentIndex, 
        title,
        imageUrl,
        description,
        doneBy,
        topSegmentedBar, 
        bottomSegmentedBar, 
        indexes = [], 
        passedCompletedChallenges = [], 
        notPassedCompletedChallenges = []; 

    var completedChallenges = {

        // Loading page event
        pageLoaded: function(args) {
            var page = args.object;
            page.bindingContext = completedChallenges;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 3;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 1;

            titleLabel = view.getViewById(page, "done-title");
            image = view.getViewById(page, "done-img");
            descriptionLabel = view.getViewById(page, "done-description");
            doneByLabel = view.getViewById(page, "done-user");

            var resp = http.request({
                url: globalConstants.BaseUrl + 'api/ChallengeResponse/GetCompleted',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
                }
            }).then(function (r) {
                //challengesResponse = JSON.stringify(r);
                completedChallengesResponse = r;
                //console.log(JSON.stringify(challengesResponse));
                console.log('Length: ' + completedChallengesResponse.length);
                helperModule.notify('Length: ' + r.length);

                indexes = completedChallengesResponse.map(function(obj) {
                    return obj["Id"];
                });
                
                notPassedCompletedChallenges = indexes.slice(0);

                console.log('Indexes: [' + indexes.join(',') + ']');
                console.log('Not passed: [' + notPassedCompletedChallenges.join(',') + ']');

                changeContent();
            }).catch(function (e) {
                console.log('Error getting completed challenges');
                console.log(e);
            });

            attachEvents();
        }, 

        onLikeImageTap: function() {
            // console.log('Current completed challenge id: ' + completedChallengesResponse[currentIndex]["Id"]);
            // var currentCompletedChallengeId = completedChallengesResponse[currentIndex]["Id"];

            // userService.likeChallenge(currentCompletedChallengeId, acceptSuccess, helperModule.handleHttpRequestError);
            helperModule.notify('Liked');

            // changeContent();

        },

        onDislikeImageTap: function() {
            // console.log('Current completed challenge id: ' + completedChallengesResponse[currentIndex]["Id"]);
            // var currentCompletedChallengeId = completedChallengesResponse[currentIndex]["Id"];

            // userService.dislikeChallenge(currentCompletedChallengeId, acceptSuccess, helperModule.handleHttpRequestError);
            helperModule.notify('Disliked');

            // changeContent();
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    function changeContent() {
        if (notPassedCompletedChallenges.length === 0) {
            notPassedCompletedChallenges = passedCompletedChallenges.slice(0);
            passedCompletedChallenges = []
        }

        currentIndex = Math.floor(Math.random() * (notPassedCompletedChallenges.length - 1));
        passedCompletedChallenges.push(notPassedCompletedChallenges[currentIndex]);
        notPassedCompletedChallenges.splice(currentIndex, 1);

        title = completedChallengesResponse[currentIndex]["ChallengeTitle"];        
        titleLabel.text = title;

        imageUrl = completedChallengesResponse[currentIndex]["ImageUrl"]
        image.src = imageUrl;

        description = completedChallengesResponse[currentIndex]["ChallengeDescription"];
        descriptionLabel.text = description;

        doneBy = completedChallengesResponse[currentIndex]["ChallengeeName"];
        doneByLabel.text = 'Done by: ' + doneBy;

        console.log('Completed Challenge Id: ' + completedChallengesResponse[currentIndex]["Id"]);
        console.log(JSON.stringify(completedChallengesResponse[currentIndex]));
        console.log('[' + indexes.join(',') + ']');
        console.log('[' + notPassedCompletedChallenges.join(',') + ']');
        console.log('[' + passedCompletedChallenges.join(',') + ']');
        console.log('-----------------');
    }

    function acceptSuccess(response) {
        var id = response.content.toJSON()['Id'];
        helperModule.notify('Voted');
    }

    return completedChallenges;
})();

exports.pageLoaded = completedChallenges.pageLoaded;
exports.onLikeImageTap = completedChallenges.onLikeImageTap;
exports.onDislikeImageTap = completedChallenges.onDislikeImageTap;