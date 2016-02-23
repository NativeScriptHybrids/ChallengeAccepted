'use strict';

var observable = require("data/observable");
var myBadgeService = require("~/data/badge-service");
var helperModule = require("~/common/helper");

var MyBadgesModel = new observable.Observable();

var responseContent;
myBadgeService.getBadges(getBadgesSuccess, helperModule.handleHttpRequestError);

function getBadgesSuccess(response) {
    responseContent =  response.content.toJSON();
    MyBadgesModel.set('myBadges', responseContent);
}

function getHint(args){
    //TODO figure out how to combine tap and doubleTap
    if (args.eventName == 'tap'){
        var name;
        for (var i = 0; i < responseContent.length; i++){
            if (responseContent[i]['Id'] ==  args.object.id){
                name = responseContent[i]['Name'];
                break;
            }
        }

        helperModule.notify(name);
        helperModule.notify('Double tap to unlock');
    }
};

var currentBadge,
    currentPage;

function unlockBadge(args, page){
    currentBadge = args.object.id;
    currentPage = page;
    return myBadgeService.unlockBadge(args.object.id, unlockBadgeSuccess, helperModule.handleHttpRequestError);
};

function unlockBadgeSuccess(response) {
    var unlockResponseContent =  response.content.toJSON();
    console.log(JSON.stringify(response));
    helperModule.notify('Successfully unlocked badge!');

    //TODO
    currentPage.addCss("#" + currentBadge + "{ opacity: 1}");

    //currentPage.addCss(".opacity { opacity: 1}");
    //// currentPage.addCss(".page-background,{background-color: black;}");
    return currentBadge;
}

exports.MyBadgesModel = MyBadgesModel;
exports.getHint = getHint;
exports.unlockBadge = unlockBadge;