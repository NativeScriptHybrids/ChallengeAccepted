'use strict';

var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");
var myChallengesService = require("~/data/my-challenges-service");
var animationModule = require("~/common/animate");
var observable = require("data/observable");
var imageSource = require("image-source");

var cameraModule = require("~/common/camera-module");

var pageModules = (function() {

    var topSegmentedBar,
        bottomSegmentedBar,
        id,
        titleLabel,
        descriptionLabel,
        difficultyLabel,
        creatorLabel,
        dateStarted,
        deadlineLabel,
        statusLabel,
        imageView,
        videoUrlTextField,
        imageUrl;

    var pageModules = {

        onNavigatedTo: function(args) {
            var page = args.object;
            page.bindingContext = page.navigationContext;
            id = page.navigationContext['id'];

            titleLabel = view.getViewById(page, "challenge-title");
            descriptionLabel = view.getViewById(page, "challenge-description");
            difficultyLabel = view.getViewById(page, "challenge-difficulty");
            creatorLabel = view.getViewById(page, "challenge-creator");
            dateStarted = view.getViewById(page, "challenge-assigned-on");
            deadlineLabel = view.getViewById(page, "challenge-deadline");
            statusLabel = view.getViewById(page, "challenge-status");
            imageView = view.getViewById(page, "challenge-imageUrl");
            videoUrlTextField = view.getViewById(page, "challenge-video-url");

            animationModule.slideInDiagonal(page);

            myChallengesService.getChallengeResponseDetails(id, getAddedChallengesSuccess, helperModule.handleHttpRequestError);

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 0;

            attachEvents();
        },

        onCompleteChallengeTap: function(args){
            console.log('completed');
            var challengeResponseViewModel = {
                "VideoUrl": videoUrlTextField.text,
                "ImageUrl": imageUrl
            };

            myChallengesService.completeChallenge(id, JSON.stringify(challengeResponseViewModel), completeChallengeSuccess, helperModule.handleHttpRequestError)
        },

        onAddPicTap: function(args){
            cameraModule.takePicture(imageView).then(function(photo){
               // imageView.src = imageUrl;
               // console.log('res' + JSON.stringify(photo));
                imageUrl = photo;
            });
        }
    };

    function completeChallengeSuccess(response){
        helperModule.notify('Challenge completed!');
        helperModule.navigateAnimated("./views/profile/challenge-done-details", {'id' : id });
        console.log(JSON.stringify(response));
    }

    function getAddedChallengesSuccess(response) {
        mapResponseToView(response);
    }

    function mapResponseToView(response) {
        //console.log(JSON.stringify(response.content.toJSON()));
        titleLabel.text = response.content.toJSON()['ChallengeTitle'];
        descriptionLabel.text = response.content.toJSON()['ChallengeDescription'];
        difficultyLabel.text = helperModule.formatDifficultyToEnum(parseInt(response.content.toJSON()["Difficulty"])).toString();
        creatorLabel.text = 'By: ' + response.content.toJSON()['CreatorName'];
        dateStarted.text = helperModule.formatDateToShort(response.content.toJSON()["AssignedOn"]).toString();
        deadlineLabel.text = helperModule.formatDateToShort(response.content.toJSON()["DeadLine"]).toString();
        statusLabel.text = helperModule.formatStatusToEnum(parseInt(response.content.toJSON()["Status"])).toString();
        imageView.src = response.content.toJSON()['ImageUrl'] || '~/images/challenge-accepted-default.png';
    }

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    return pageModules;
})();

exports.onNavigatedTo = pageModules.onNavigatedTo;
exports.onCompleteChallengeTap = pageModules.onCompleteChallengeTap;
exports.onAddPicTap = pageModules.onAddPicTap;
