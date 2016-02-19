var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var http = require("http");
var imageSource = require("image-source");


var challengeModules = (function() {
	var challengesResponse;
	// var response = [{
	//         "ChallengeId": 1,
	//         "Title": "Elbow Challenge",
	//         "ImageUrl": "https://eustat.files.wordpress.com/2015/05/wpid-wp-1432967860156.jpg",
	//         "Description": "Lick your elbow.",
	//         "Difficulty": 1,
	//         "DaysToComplete": 7,
	//         "CreatorName": "admin"
	//     },
	//     {
	//         "ChallengeId": 2,
	//         "Title": "Double Elbow Challenge",
	//         "ImageUrl": "http://i.imgur.com/pV36F.gif",
	//         "Description": "Lick both your elbow.",
	//         "Difficulty": 1,
	//         "DaysToComplete": 7,
	//         "CreatorName": "admin"
	//     },
	//     {
	//         "ChallengeId": 3,
	//         "Title": "Handsfree Shot Challenge",
	//         "ImageUrl": "http://frompghwithlove.files.wordpress.com/2011/06/19050_753784512713_8230969_42590805_7550724_n.jpg",
	//         "Description": "Drink a shot without using yor hands.",
	//         "Difficulty": 0,
	//         "DaysToComplete": 7,
	//         "CreatorName": "admin"
	//     },
	//     {
	//         "ChallengeId": 4,
	//         "Title": "Inside-out Challenge",
	//         "ImageUrl": "http://www.nerdygaga.com/wp-content/uploads/2012/09/weird-and-funny-mens-fashion-show.jpg",
	//         "Description": "Wear your top/shirt inside-out in the streets.",
	//         "Difficulty": 0,
	//         "DaysToComplete": 7,
	//         "CreatorName": "admin"
	//     },
	//     {
	//         "ChallengeId": 5,
	//         "Title": "Lick your nose",
	//         "ImageUrl": "http://i.dailymail.co.uk/i/pix/2015/05/08/10/2872081D00000578-3073349-image-a-8_1431077252730.jpg",
	//         "Description": "I can't. I find that it's rather uncomfortable if I try, and my tongue ends up getting tired. But I have known people to do it.",
	//         "Difficulty": 4,
	//         "DaysToComplete": 7,
	//         "CreatorName": "admin"
	//     },
	//     {
	//         "ChallengeId": 6,
	//         "Title": "Slap a cop",
	//         "ImageUrl": "http://content4.video.news.com.au/NDM_-_news.com.au/138/929/Cop_Slap_17102012.Still004.jpg",
	//         "Description": "Is it justified if I slap a police personnel who is in duty, for abusing me unnecessarily and slapping me?",
	//         "Difficulty": 8,
	//         "DaysToComplete": 7,
	//         "CreatorName": "admin"
	//     }];

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

						    	console.log(r.length);

	    	                    //changeContent();
							}, function (e) {
								console.log('Error getting challenges');
							    console.log(e);
							});
            // page.bindingContext = pavmModule.mainViewModel;
            // topmost = frameModule.topmost();
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
        console.log('Index: ' + index + ' *** Title: ' + title);
        console.log('-----------------');
        index++;
    }

    return challengeModules;
})();

exports.pageLoaded = challengeModules.pageLoaded;
exports.onDeclineTap = challengeModules.onDeclineTap;