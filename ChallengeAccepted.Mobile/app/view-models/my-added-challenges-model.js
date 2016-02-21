'use strict';

var observable = require("data/observable");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var moment = require('moment');

var MyAddedChallengesModel = new observable.Observable();

var responseContent;
myChallengesService.getCreatedChallenges(getAddedChallengesSuccess, helperModule.handleHttpRequestError);

function getAddedChallengesSuccess(response) {
    responseContent =  response.content.toJSON();
    for (var i = 0; i < responseContent.length; i++) {
        responseContent[i]["Difficulty"] = helperModule.formatDifficultyToEnum(parseInt(responseContent[i]["Difficulty"])).toString();
    }
    MyAddedChallengesModel.set('addedChallenges', responseContent);
}

function viewChallenge(args){
    var id = responseContent[args.index]['ChallengeId'];
    helperModule.navigate("./views/profile/challenge-details", {'id' : id});
};

exports.MyAddedChallengesModel = MyAddedChallengesModel;
exports.viewChallenge = viewChallenge;

