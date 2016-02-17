var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");


var challengeModules = (function() {
	var response = [{
	        "ChallengeId": 1,
	        "Title": "Elbow Challenge",
	        "Description": "Lick your elbow.",
	        "Difficulty": 1,
	        "DaysToComplete": 7,
	        "CreatorName": "admin"
	    },
	    {
	        "ChallengeId": 2,
	        "Title": "Double Elbow Challenge",
	        "Description": "Lick both your elbow.",
	        "Difficulty": 1,
	        "DaysToComplete": 7,
	        "CreatorName": "admin"
	    },
	    {
	        "ChallengeId": 3,
	        "Title": "Handsfree Shot Challenge",
	        "Description": "Drink a shot without using yor hands.",
	        "Difficulty": 0,
	        "DaysToComplete": 7,
	        "CreatorName": "admin"
	    },
	    {
	        "ChallengeId": 4,
	        "Title": "Inside-out Challenge",
	        "Description": "Wear your top/shirt inside-out in the streets.",
	        "Difficulty": 0,
	        "DaysToComplete": 7,
	        "CreatorName": "admin"
	    }]

	var challenges = new observable.Observable({
		"allChallenges": response
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

    var challengeModules = {

        pageLoaded: function(args) {
            var page = args.object;
            page.bindingContext = challenges;

            titleLabel = view.getViewById(page, "challenge-title");
            image = view.getViewById(page, "challenge-img");
            descriptionLabel = view.getViewById(page, "challenge-description");
            ratingLabel = view.getViewById(page, "challenge-rating");

            changeContent();
            console.log('Title: ' + title);
            //page.bindingContext = vmModule.mainViewModel;
            // topmost = frameModule.topmost();
        },

        onDeclineTap: function() {
        	console.log('Decline TAP');
        	var i;
        	changeContent();

            console.log('Title: ' + title);

            //TODO: Implement not repeating challenge in one loop
        }
    };

    function changeContent() {
    	currentIndex = Math.floor((Math.random() * 3) + 1);
        title = response[currentIndex]["Title"];        
        titleLabel.text = title;

        // imageUrl = response[currentIndex]["ImageUrl"]
        // image.src = imageUrl;

        description = response[currentIndex]["Description"];
        descriptionLabel.text = description;

        rating = response[currentIndex]["Difficulty"];
        ratingLabel.text = 'Rating: ' + rating;
    }

    return challengeModules;
})();

exports.pageLoaded = challengeModules.pageLoaded;
exports.onDeclineTap = challengeModules.onDeclineTap;