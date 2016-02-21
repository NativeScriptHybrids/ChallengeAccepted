var http = require("http");
var globalConstants = require("~/common/global-constants");
var AppSettings = require("application-settings");

var HttpRequester = (function () {

    function makePostRequest (actionUrl, method, content, headers, success, error) {
        return http.request({
            url: globalConstants.BaseUrl + actionUrl,
            method: method,
            content: content,
            headers: headers
        }).then(function (response) {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                success(response);
            } else {
                error(response)
            }
        }).catch(function (error) {
            console.log('error');
            console.log(error);
            throw new Error(JSON.stringify(error.content));
        });
    }

    function makeGetRequest (actionUrl, method, headers, success, error) {
        return http.request({
            url: globalConstants.BaseUrl + actionUrl,
            method: method,
            headers: headers
        }).then(function (response) {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                success(response);
            } else {
                error(response)
            }
        }).catch(function (error) {
            console.log('error');
            console.log(error);
            throw new Error(JSON.stringify(error.content));
        });
    }

    var HttpRequester = {

        get: function(actionUrl, headers, success, error){
            return makeGetRequest(actionUrl, 'GET', headers, success, error);
        },

        post: function(actionUrl, content, headers, success, error){
            return makePostRequest(actionUrl, 'POST', content, headers, success, error);
        },

        authGet: function(actionUrl, success, error){
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            return makeGetRequest(actionUrl, 'GET', headers, success, error);
        },

        authPost: function(actionUrl, content, success, error){
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            return makePostRequest(actionUrl, 'POST', content, headers, success, error);
        },

        authPostImage: function(actionUrl, content, success, error){
            var headers = {
                "Content-Type": "image/jpeg",
                "Authorization": "Bearer " + AppSettings.getString(globalConstants.LocalStorageTokenKey)
            };

            console.log(JSON.stringify(content));

            return makePostRequest(actionUrl, 'POST', content, headers, success, error);
        }
    };

    return HttpRequester;
})();

exports.get = HttpRequester.get;
exports.post = HttpRequester.post;
exports.authGet = HttpRequester.authGet;
exports.authPost = HttpRequester.authPost;
exports.authPostImage = HttpRequester.authPostImage;