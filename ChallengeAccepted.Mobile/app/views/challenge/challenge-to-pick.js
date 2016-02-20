var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var http = require("http");
var imageSource = require("image-source");
var userService = require("~/data/user-service");


var challengeModules = (function() {
	var challengesResponse;

	var challenges = new observable.Observable({
		"allChallenges": challengesResponse
	});

	var topmost,
		titleLabel,
		image,
		descriptionLabel,
		ratingLabel,
		currentIndex,
		title,
		imageUrl,
		description,
		rating;

	var index = 0;

    var challengeModules = {

        pageLoaded: function(args) {
            var page = args.object;
            page.bindingContext = challenges;

            titleLabel = view.getViewById(page, "challenge-title");
            image = view.getViewById(page, "challenge-img");
            descriptionLabel = view.getViewById(page, "challenge-description");
            ratingLabel = view.getViewById(page, "challenge-rating");



        	var resp = http.getJSON("https://challengeaccepted.azurewebsites.net/api/challenge/get").then(function (r) {
						    	//challengesResponse = JSON.stringify(r);
						    	challengesResponse = r;
                                console.log(JSON.stringify(challengesResponse));

						    	console.log(r.length);

	    	                    //changeContent();
							}, function (e) {
								console.log('Error getting challenges');
							    console.log(e);
							});
        },

        onAcceptTap: function() {
        	console.log('Current challenge id: ' + challengesResponse[currentIndex]["ChallengeId"]);
            var currentChallengeId = challengesResponse[currentIndex]["ChallengeId"];

            userService.acceptChallenge(currentChallengeId, acceptSuccess, helperModule.handleHttpRequestError);
        },

        onDeclineTap: function() {
        	console.log('Decline TAP');
        	var i;
        	changeContent();

            //TODO: Implement not repeating challenge in one loop
        }
    };

    function changeContent() {
    	currentIndex = Math.floor(Math.random() * (challengesResponse.length - 1));

        title = challengesResponse[currentIndex]["Title"];        
        titleLabel.text = title;

        // imageUrl = response[currentIndex]["ImageUrl"]
        // image.imageSource = imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")

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
