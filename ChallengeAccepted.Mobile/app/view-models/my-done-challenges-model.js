'use strict';

var observable = require("data/observable");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var moment = require('moment');

var MyDoneChallengesModel = new observable.Observable();

myChallengesService.getCompletedChallenges(getDoneChallengesSuccess, helperModule.handleHttpRequestError);

function getDoneChallengesSuccess(response) {
    var responseContent =  response.content.toJSON();

    //if (responseContent.length === 0){
    //    responseContent = [{
    //        'ChallengeTitle': 'No done challenges yet'
    //        }];
    //}else {
        for (var i = 0; i < responseContent.length; i++) {
            responseContent[i]["Difficulty"] = helperModule.formatDifficultyToEnum(parseInt(responseContent[i]["Difficulty"])).toString();
        }
   // }


    MyDoneChallengesModel.set('doneChallenges', responseContent);
}

function viewChallenge(args){
    console.log(args.index);
    //TODO: navigate to details page with current index as data;
};

exports.MyDoneChallengesModel = MyDoneChallengesModel;
exports.viewChallenge = viewChallenge;

