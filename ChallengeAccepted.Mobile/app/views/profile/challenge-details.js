'use strict';

var helperModule = require("~/common/helper");
var view = require("ui/core/view");
var AppSettings = require("application-settings");
var globalConstants = require("~/common/global-constants");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var animationModule = require("~/common/animate");

var pageModules = (function() {

    var topSegmentedBar,
        bottomSegmentedBar,
        id,
        titleLabel,
        descriptionLabel,
        difficultyLabel,
        daysToCompleteLabel,
        imageView;

    var pageModules = {

        onNavigatedTo: function(args) {
            var page = args.object;
            page.bindingContext = page.navigationContext;
            id = page.navigationContext['id'];

            titleLabel = view.getViewById(page, "challenge-title");
            descriptionLabel = view.getViewById(page, "challenge-description");
            difficultyLabel = view.getViewById(page, "challenge-difficulty");
            imageView = view.getViewById(page, "challenge-imageUrl");
            daysToCompleteLabel = view.getViewById(page, "challenge-days-to-complete");

            animationModule.slideInDiagonal(page);

            myChallengesService.getAddedChallengeDetails(id, getAddedChallengesSuccess, helperModule.handleHttpRequestError);

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 2;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 2;

            attachEvents();
        }
    };

    function getAddedChallengesSuccess(response) {
        mapResponseToView(response);
    }

    function mapResponseToView(response) {
        titleLabel.text = response.content.toJSON()['Title'];
        descriptionLabel.text = response.content.toJSON()['Description'];
        difficultyLabel.text = 'Difficulty: ' + helperModule.formatDifficultyToEnum(parseInt(response.content.toJSON()["Difficulty"])).toString();
        imageView.src = response.content.toJSON()['ImageUrl'];
        daysToCompleteLabel.text = 'Days to complete: ' + response.content.toJSON()['DaysToComplete'];
    }

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    return pageModules;
})();

exports.onNavigatedTo = pageModules.onNavigatedTo;


