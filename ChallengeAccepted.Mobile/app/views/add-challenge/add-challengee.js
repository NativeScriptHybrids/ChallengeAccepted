var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var http = require("http");
var imageSource = require("image-source");
var userService = require("~/data/user-service");


var addModule = (function() {

	// var challenges = new observable.Observable({
	// 	"allChallenges": challengesResponse
	// });

	var topmost,
		titleTextField,
		imageUrlTextField,
		descriptionTextField,
		ratingTextField,
		daysToCompleteTextField,
		title,
		imageUrl,
		description,
		rating,
		daysToComplete;

    var addModule = {

        pageLoaded: function(args) {
            var page = args.object;

            titleTextField = view.getViewById(page, "add-title");
            imageUrlTextField = view.getViewById(page, "add-image-url");
            descriptionTextField = view.getViewById(page, "add-description");
            ratingTextField = view.getViewById(page, "add-rating");
            daysToCompleteTextField = view.getViewById(page, "add-days-to-complete");

            topmost = frameModule.topmost();
        },

        onAddBtnTap: function() {
        	title = titleTextField.text;
        	imageUrl = imageUrlTextField.text;
        	description = descriptionTextField.text;
        	rating = parseInt(ratingTextField.text);
        	daysToComplete = parseInt(daysToCompleteTextField.text);

        	var newChallenge = {
        		"Title": title,
        		"Description": description,
        		"Difficulty": rating,
        		"DaysToComplete": daysToComplete
        	}

        	userService.addChallenge(newChallenge, addSuccess, helperModule.handleHttpRequestError);      	
        },

        onBackToProfileBtnTap: function() {
        	topmost.goBack();
        }

    };

    function addSuccess() {
    	helperModule.notify('Challenge Added');
			
		//topmost.goBack();
    }

    return addModule;
})();

exports.pageLoaded = addModule.pageLoaded;
exports.onAddBtnTap = addModule.onAddBtnTap;