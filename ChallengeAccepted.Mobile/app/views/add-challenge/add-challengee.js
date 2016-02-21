var page = require("ui/page");
var view = require("ui/core/view");
var helperModule = require("~/common/helper");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var http = require("http");
var imageSource = require("image-source");
var userService = require("~/data/user-service");
var segmentedBarPopulator = require("~/common/segmented-bar-populator");

var addModule = (function() {

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
		daysToComplete,
        topSegmentedBar,
        bottomSegmentedBar;

    var addModule = {

        pageLoaded: function(args) {
            var page = args.object;

            bottomSegmentedBar = view.getViewById(page, 'bottom-segmented-bar');
            bottomSegmentedBar.selectedIndex = 0;

            topSegmentedBar = view.getViewById(page, 'top-segmented-bar');
            topSegmentedBar.selectedIndex = 2;

            attachEvents();

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
        }
    };

    function attachEvents(){
        segmentedBarPopulator.populateProfileBottomSegmentedBar(bottomSegmentedBar);
        segmentedBarPopulator.populateProfileTopSegmentedBar(topSegmentedBar);
    }

    function addSuccess() {
    	helperModule.notify('Challenge Added');
			
		//topmost.goBack();
    }

    return addModule;
})();

exports.pageLoaded = addModule.pageLoaded;
exports.onAddBtnTap = addModule.onAddBtnTap;