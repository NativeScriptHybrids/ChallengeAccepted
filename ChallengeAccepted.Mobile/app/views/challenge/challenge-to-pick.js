var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var http = require("http");
var imageSource = require("image-source");
var userService = require("~/data/user-service");
var stackLayout = require("ui/layouts/stack-layout");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");
var animationModule = require("~/common/animate");

var challengeModules = (function() {
	var challengesResponse;

	var challenges = new observable.Observable({
		"allChallenges": challengesResponse
	});

	var topmost,
        layout,
		titleLabel,
		image,
		descriptionLabel,
		difficultyLabel,
        daysToCompleteLabel,
		currentIndex,
		title,
		imageUrl,
		description,
		difficulty,
        daysToComplete,
        topSegmentedBar,
        bottomSegmentedBar,
        previousDeltaX = 0,
        indexes = [],
        passedChallenges = [],
        notPassedChallenges = [],
        page;

	var index = 0;

    var challengeModules = {

        pageLoaded: function(args) {
            page = args.object;
            page.bindingContext = challenges;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 1;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 2;

            layout = view.getViewById(page, "challenge-stack");
            titleLabel = view.getViewById(page, "challenge-title");
            image = view.getViewById(page, "challenge-img");
            descriptionLabel = view.getViewById(page, "challenge-description");
            difficultyLabel = view.getViewById(page, "challenge-difficulty");
            daysToCompleteLabel = view.getViewById(page, "challenge-days-to-complete");

            animationModule.slideInDiagonal(page);
        	var resp = http.getJSON("https://challengeaccepted.azurewebsites.net/api/challenge/get")
                .then(function (r) {
    		    	//challengesResponse = JSON.stringify(r);
    		    	challengesResponse = r;
                    //console.log(JSON.stringify(challengesResponse));
    		    	console.log('Length: ' + challengesResponse.length);

                    indexes = challengesResponse.map(function(obj) {
                        return obj["ChallengeId"];
                    });
                    
                    notPassedChallenges = indexes.slice(0);

                    console.log('Indexes: [' + indexes.join(',') + ']');
                    console.log('Not passed: [' + notPassedChallenges.join(',') + ']');
                    changeContent();
                    panEvent();
    			}, function (e) {
    				console.log('Error getting challenges');
    			    console.log(e);
    			}
            );

            attachEvents();
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    function panEvent() {

        layout.on('pan', function(args) {

            if (args.deltaX < -150 && previousDeltaX >= -150) {

                declineChallenge();
                previousDeltaX = args.deltaX;

                return;
            }

            if (args.deltaX > 150 && previousDeltaX <= 150) {

                acceptChallenge();
                previousDeltaX = args.deltaX;

                return;                
            }

            previousDeltaX = args.deltaX;
        });
    }

    function acceptChallenge() {
        console.log('Current challenge id: ' + challengesResponse[currentIndex]["ChallengeId"]);
        var currentChallengeId = challengesResponse[currentIndex]["ChallengeId"];

        userService.acceptChallenge(currentChallengeId, acceptSuccess, helperModule.handleHttpRequestError);
    }

    function declineChallenge() {
        changeContent();
    }

    function changeContent() {
        if (notPassedChallenges.length === 0) {
            notPassedChallenges = passedChallenges.slice(0);
            passedChallenges = []
        }

        animationModule.slideInDiagonal(page);

    	currentIndex = Math.floor(Math.random() * (notPassedChallenges.length - 1));
        passedChallenges.push(notPassedChallenges[currentIndex]);
        notPassedChallenges.splice(currentIndex, 1);

        title = challengesResponse[currentIndex]["Title"];        
        titleLabel.text = title;

        imageUrl = challengesResponse[currentIndex]["ImageUrl"]
        image.src = imageUrl;

        description = challengesResponse[currentIndex]["Description"];
        descriptionLabel.text = description;

        difficulty = helperModule.formatDifficultyToEnum(parseInt(challengesResponse[currentIndex]["Difficulty"])).toString();
        difficultyLabel.text = 'Difficulty: ' + difficulty;

        daysToComplete = challengesResponse[currentIndex]["DaysToComplete"];
        daysToCompleteLabel.text = 'Days to complete: ' + daysToComplete;

        console.log('ChallengeId: ' + challengesResponse[currentIndex]["ChallengeId"]);
        console.log(JSON.stringify(challengesResponse[currentIndex]));
        console.log('[' + indexes.join(',') + ']');
        console.log('[' + notPassedChallenges.join(',') + ']');
        console.log('[' + passedChallenges.join(',') + ']');
        console.log('-----------------');
    }

    function acceptSuccess(response) {
        var id = response.content.toJSON()['Id'];
        helperModule.notify('Challenge Accepted');
        helperModule.navigateAnimated("./views/profile/challenge-active-details", {'id' : id });
    }

    return challengeModules;
})();

exports.pageLoaded = challengeModules.pageLoaded;
exports.onAcceptTap = challengeModules.onAcceptTap;
exports.onDeclineTap = challengeModules.onDeclineTap;
