'use strict';

var observable = require("data/observable");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var moment = require('moment');

var MyActiveChallengesModel = new observable.Observable();
var responseContent;
myChallengesService.getActiveChallenges(getActiveChallengesSuccess, helperModule.handleHttpRequestError);

function getActiveChallengesSuccess(response) {
    responseContent =  response.content.toJSON();
    for (var i = 0; i < responseContent.length; i++) {
        responseContent[i]["DeadLine"] = helperModule.formatDateToShort(responseContent[i]["DeadLine"]).toString();
    }

    MyActiveChallengesModel.set('activeChallenges', responseContent);
}

function viewChallenge(args){
    var id = responseContent[args.index]['Id'];
    helperModule.navigate("./views/profile/challenge-active-details", {'id' : id });
};

exports.MyActiveChallengesModel = MyActiveChallengesModel;
exports.viewChallenge = viewChallenge;

