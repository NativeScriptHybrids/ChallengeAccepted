'use strict';

var observable = require("data/observable");
var myChallengesService = require("~/data/my-challenges-service");
var helperModule = require("~/common/helper");
var moment = require('moment');

var MyActiveChallengesModel = new observable.Observable();

myChallengesService.getActiveChallenges(getActiveChallengesSuccess, helperModule.handleHttpRequestError);

function getActiveChallengesSuccess(response) {
    var responseContent =  response.content.toJSON();
    for (var i = 0; i < responseContent.length; i++) {
        responseContent[i]["DeadLine"] = helperModule.formatDateToShort(responseContent[i]["DeadLine"]).toString();
    }

    MyActiveChallengesModel.set('activeChallenges', responseContent);
}

function viewChallenge(args){
    console.log(args.index);
    //TODO: navigate to details page with current index as data;
};

exports.MyActiveChallengesModel = MyActiveChallengesModel;
exports.viewChallenge = viewChallenge;

