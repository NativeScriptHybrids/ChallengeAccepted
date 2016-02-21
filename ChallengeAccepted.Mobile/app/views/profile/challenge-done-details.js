'use strict';

var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var observable = require("data/observable");

var pageModules = (function() {

    var topSegmentedBar,
        bottomSegmentedBar,
        id,
        titleLabel,
        descriptionLabel,
        difficultyLabel,
        scoreLabel,
        videoLinkLabel,
        imageView;

    var pageModules = {

        onNavigatedTo: function(args) {
            var page = args.object;
            page.bindingContext = page.navigationContext;
            id = page.navigationContext['id'];

            titleLabel = view.getViewById(page, "challenge-title");
            descriptionLabel = view.getViewById(page, "challenge-description");
            difficultyLabel = view.getViewById(page, "challenge-difficulty");
            scoreLabel = view.getViewById(page, "challenge-rating");
            videoLinkLabel = view.getViewById(page, "challenge-video-link");
            imageView = view.getViewById(page, "challenge-imageUrl");

            myChallengesService.getChallengeResponseDetails(id, getAddedChallengesSuccess, helperModule.handleHttpRequestError);

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 1;

            attachEvents();
        }
    };

    function getAddedChallengesSuccess(response) {
        mapResponseToView(response);
    }

    function mapResponseToView(response) {
        console.log(JSON.stringify(response.content.toJSON()));
        titleLabel.text = response.content.toJSON()['ChallengeTitle'];
        descriptionLabel.text = response.content.toJSON()['ChallengeDescription'];
        difficultyLabel.text = helperModule.formatDifficultyToEnum(parseInt(response.content.toJSON()["Difficulty"])).toString();
        scoreLabel.text = response.content.toJSON()["Score"];
        videoLinkLabel.text = response.content.toJSON()["VideoLink"] || '';
        imageView.src = response.content.toJSON()["ImageUrl"];
    }

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    return pageModules;
})();

exports.onNavigatedTo = pageModules.onNavigatedTo;
