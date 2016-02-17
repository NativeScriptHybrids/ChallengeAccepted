var GlobalConstants = (function() {

    var GlobalConstants = {

        BaseUrl: 'https://challengeaccepted.azurewebsites.net/',
        LocalStorageTokenKey: 'ChallengeAcceptedToken',
        LocalStorageUsernameKey: 'ChallengeAcceptedUsername'
    };

    return GlobalConstants;
})();

exports.BaseUrl = GlobalConstants.BaseUrl;