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
		ratingLabel,
		currentIndex,
		title,
		imageUrl,
		description,
		rating,
        topSegmentedBar,
        bottomSegmentedBar;
        previousDeltaX = 0;

	var index = 0;

    var challengeModules = {

        pageLoaded: function(args) {
            var page = args.object;
            page.bindingContext = challenges;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 1;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 2;

            layout = view.getViewById(page, "challenge-stack");
            titleLabel = view.getViewById(page, "challenge-title");
            image = view.getViewById(page, "challenge-img");
            descriptionLabel = view.getViewById(page, "challenge-description");
            ratingLabel = view.getViewById(page, "challenge-rating");

        	var resp = http.getJSON("https://challengeaccepted.azurewebsites.net/api/challenge/get").then(function (r) {
    		    	//challengesResponse = JSON.stringify(r);
    		    	challengesResponse = r;
                    console.log(JSON.stringify(challengesResponse));

    		    	console.log(r.length);

                    //acceptChallenge();
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
    	currentIndex = Math.floor(Math.random() * (challengesResponse.length - 1));

        title = challengesResponse[currentIndex]["Title"];        
        titleLabel.text = title;

        imageUrl = challengesResponse[currentIndex]["ImageUrl"]
        image.src = imageUrl;

        description = challengesResponse[currentIndex]["Description"];
        descriptionLabel.text = description;

        rating = challengesResponse[currentIndex]["Difficulty"];
        ratingLabel.text = 'Rating: ' + rating;

        console.log('CurrentIndex: ' + currentIndex);
        console.log('ChallengeId: ' + challengesResponse[currentIndex]["ChallengeId"]);
        console.log('Index: ' + index + ' *** Title: ' + title);
        console.log('-----------------');
        index++;

    }

    function acceptSuccess() {
        helperModule.notify('Challenge Accepted');
    }

    return challengeModules;
})();

exports.pageLoaded = challengeModules.pageLoaded;
exports.onAcceptTap = challengeModules.onAcceptTap;
exports.onDeclineTap = challengeModules.onDeclineTap;
