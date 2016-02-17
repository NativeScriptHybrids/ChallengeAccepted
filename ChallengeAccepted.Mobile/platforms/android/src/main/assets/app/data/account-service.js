var http = require("http");
var globalConstants = require("~/common/global-constants");
var AccountService = (function () {

    var AccountService = {

        register: function register(email, password, confirmPassword) {
            console.log('in register')
            console.log(email)
            console.log(password)
            console.log(confirmPassword)
            //http.request({
            //    url: "https://httpbin.org/post",
            //    method: "POST",
            //    headers: { "Content-Type": "application/json" },
            //    content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
            //}).then(function (response) {
            //    result = response.content.toJSON();
            //    console.log(result);
            //}, function (e) {
            //    console.log("Error occurred " + e);
            //});

           return new Promise(function(resolve, reject) {
                http.request({ //"Email=%@&Password=%@&ConfirmPassword=%@&ProfileType=%@"
                    url: globalConstants.BaseUrl + 'api/Account/Register?Email=' + email + '&Password=' + password + '&ConfirmPassword=' + confirmPassword,
                    method: "POST",
                    content: JSON.stringify({
                        Email: email,
                        Password: password,
                        ConfirmPassword: confirmPassword,
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(function(data) {
                    console.log(data)
                    console.log(data.content)
                    console.log(data.content.toJSON())
                    //alert('yay');
                    //config.token = data.content.toJSON().Result.access_token;
                    resolve();
                }).catch(function(error) {
                    //console.log(JSON.stringify(error));
                    //alert('nope');
                    reject();
                });
            });
            //return fetchModule.fetch(globalConstants.BaseUrl + 'api/Account/Register', {
            //    method: "POST",
            //    body: JSON.stringify({
            //        Email: email,
            //        Password: password,
            //        ConfirmPassword: confirmPassword,
            //    }),
            //    headers: {
            //        "Content-Type": "application/x-www-form-urlencoded"
            //    }
            //})
            //    .then(handleErrors)
            //    .then(function(response) {
            //        alert('yay');
            //        return response.json();
            //    }).then(function(data) {
            //        //config.token = data.Result.access_token;
            //    });
            //var promise = new Promise();
            //
            //$.ajax({
            //    url: globalConstants.BaseUrl + 'api/Account/Register',
            //    type: "POST",
            //    data: {
            //        Email: email,
            //        Password: password,
            //        ConfirmPassword: confirmPassword
            //    },
            //    contentType: "application/x-www-form-urlencoded",
            //    success: function (data) {
            //        console.log('regnah seeee');
            //        promise.resolve(data);
            //    },
            //    error: function (error) {
            //        promise.reject(error);
            //    }
            //});
            //
            //return promise;
        }


    };

    function handleErrors(response) {
        if (!response.ok) {
            console.log(JSON.stringify(response));
            throw Error(response.statusText);
        }
        return response;
    }

    return AccountService;
})();

exports.register = AccountService.register;
