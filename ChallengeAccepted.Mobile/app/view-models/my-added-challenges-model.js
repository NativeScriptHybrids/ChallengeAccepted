'use strict';

var observable = require("data/observable");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var moment = require('moment');

var MyAddedChallengesModel = new observable.Observable();

myChallengesService.getCreatedChallenges(getAddedChallengesSuccess, helperModule.handleHttpRequestError);

function getAddedChallengesSuccess(response) {
    var responseContent =  response.content.toJSON();
    for (var i = 0; i < responseContent.length; i++) {
        responseContent[i]["Difficulty"] = helperModule.formatDifficultyToEnum(parseInt(responseContent[i]["Difficulty"])).toString();
    }
    MyAddedChallengesModel.set('addedChallenges', responseContent);
}

function viewChallenge(args){
    console.log(args.index);
    //TODO: navigate to details page with current index as data;
};

exports.MyAddedChallengesModel = MyAddedChallengesModel;
exports.viewChallenge = viewChallenge;

