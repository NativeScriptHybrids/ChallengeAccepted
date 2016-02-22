var constantsModule = require("nativescript-sqlite");

var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        _super.call(this);
    }

    //TODO: update
    Profile.prototype.addProfile = function (username, imageUrl) {
        global.db.execSQL("insert into Profile values (?, ?)", [username, imageUrl])
            .then(function(id){
                console.log("inserted:", id);
            }, function(err){
                console.log(err);
            });
    };


    Profile.prototype.getProfile = function (username) {
        return global.db.all("select ImageUrl from Profile where Username = '" + username + "';")
            .then(function(resultSet) {
                console.log("result is: ", resultSet);
                return resultSet;
            }, function(err){
                console.log(err);
            });
    };

    //Profile.prototype.dropTable = function (name) {
    //    return global.db.all("drop table " + name + ";")
    //        .then(function() {
    //            console.log("Dropped " + name);
    //        }, function(err){
    //            console.log(err);
    //        });
    //};
    //
    //Profile.prototype.deleteDataFromTable = function (name) {
    //    return global.db.all("delete from " + name + ";")
    //        .then(function() {
    //            console.log("Old data removed");
    //        }, function(err){
    //            console.log(err);
    //        });
    //};

    return Profile;

})(Object);

exports.Profile = new Profile();