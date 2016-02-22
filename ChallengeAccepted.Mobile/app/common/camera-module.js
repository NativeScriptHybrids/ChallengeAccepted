var cameraModule = require("camera");
var Everlive = require('~/libs/everlive.all.min');
var el = new Everlive('7n6o4m8ciuj4mgo1');

var CameraModule = (function() {

    var CameraModule = {

        takePicture: function(imageView){
            console.log('in camera');
            return cameraModule.takePicture()
                .then(function(photo){
                    if (imageView){
                        imageView.imageSource = photo;
                    }
                    return photo;
            })
                .then(savePicture);
        }
    };

    function savePicture(photo){
        console.log("Result is an image source instance");
        var imageString = photo.toBase64String('.jpg', 100);

        var imageFile = {
            Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
            ContentType: "image/jpeg",
            base64: imageString
        };

        return el.Files.create(imageFile).then(function(response){
            console.log('in then');
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(response.result['Uri']));
            var imageUri = response.result['Uri'];
            return imageUri;
        });
    }

    //function loadPhotos() {
    //    el.Files.get().then(function(data) {
    //        console.log('in get response')
    //        var files = [];
    //        for (var i = data.result.length - 1; i >= 0; i--) {
    //            var image = data.result[i];
    //            files.push(image.Uri);
    //        }
    //
    //        console.log('photos count ' + files.length);
    //
    //    });
    //};


    return CameraModule;
})();

exports.takePicture = CameraModule.takePicture;
