'use strict';

define(["angular"], function (angular) {

    var ApplaudioUpload = angular.module("ApplaudioUpload", [
        "applaudio",
        "ApplaudioUtilities"
    ]);

    ApplaudioUpload.service("UploadService", [
        "ApplaudioUtils",
        "configuration",
    function(Utils, configuration){

        var UploadService = this;

        var progressSubscriberCallbacks = [];

        UploadService.subscribeForProgressUpdates = function(callback) {
            console.log("UploadService.subscribeForProgressUpdates(callback)");
            progressSubscriberCallbacks.push(callback);
        };

        UploadService.upload = function(path, uploadFiles) {

            console.log("UploadService.upload(" + path + ")");
            console.log(uploadFiles);

            var uploadData = new FormData();
            uploadData.append("path", path);
            Utils.forEach(uploadFiles, function(file){
                uploadData.append(file.name, file)
            });

            var xhr = new XMLHttpRequest();
            UploadService.registerProgressEvents(xhr.upload);
            xhr.open('POST', configuration.paths.api.upload, true);

            xhr.send(uploadData);
        };

        UploadService.registerProgressEvents = function(xhrUploadObject) {
            console.log("UploadService.registerProgressEvents.");

            xhrUploadObject.addEventListener("load", function(e) {
                console.log("upload successful");
                Utils.forEach(progressSubscriberCallbacks, function(subscriberCallback) {
                    subscriberCallback({ type: "complete", success: true });
                });
            }, false);

            xhrUploadObject.addEventListener("progress", function updateProgress(event) {
                if (event.lengthComputable) {

                    var percentComplete = (event.loaded / event.total)*100;
                    console.log("Percent Complete: " + percentComplete);
                    Utils.forEach(progressSubscriberCallbacks, function(subscriberCallback) {
                        subscriberCallback({ type: "progress", progress: percentComplete });
                    });

                } else {
                    console.log("Progress not computable for this browser.");
                }
            }, false);

        };
    }]);

});