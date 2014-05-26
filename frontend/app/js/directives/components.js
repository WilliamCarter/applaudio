'use strict';

define(["angular", "globals", "utils"], function (angular, Globals, Utils) {

    var ApplaudioComponents = angular.module("ApplaudioComponents", []);

    ApplaudioComponents.directive("applaudioScrollable", function() {

        return {
            restrict: "A",
            transclude: true,
            templateUrl: "views/components/scrollable.html",
            link: function(scope, element, attrs) {

                // Ensure top and bottom fades are positioned within the scrolling element correctly.
                element[0].style.position = "relative";

                var scrollable = element[0].getElementsByClassName("scrollable")[0];
                var topFade = element[0].getElementsByClassName("fade-top")[0];
                var bottomFade = element[0].getElementsByClassName("fade-bottom")[0];

                scrollable.onscroll = function() {
                    if (scrollable.scrollTop > 4) {
                        topFade.hidden = false;
                    } else {
                        topFade.hidden = true;
                    }

                    if (scrollable.scrollHeight - (scrollable.scrollTop + scrollable.clientHeight) < 4) {
                        bottomFade.hidden = true;
                    } else {
                        bottomFade.hidden = false;
                    }

                };

            }
        };
    });

    ApplaudioComponents.service("UploadService", function(){

        var UploadService = this;

        var progress = 0;
        var progressSubscriberCallbacks = [];

        UploadService.subscribeForProgressUpdates = function(callback) {
            progressSubscriberCallbacks.push(callback);
        };

        UploadService.upload = function(formData) {
            var xhr = new XMLHttpRequest();
            UploadService.registerProgressEvents(xhr.upload);
            xhr.open('POST', Globals.paths.upload, true);

            xhr.send(formData);

        };

        UploadService.registerProgressEvents = function(xhrUploadObject) {
            console.log("UploadService.registerProgressEvents.");

            xhrUploadObject.addEventListener("load", function(e) {
                console.log("upload successful");
                console.log(e);
            }, false);

            xhrUploadObject.addEventListener("progress", function updateProgress(event) {
                if (event.lengthComputable) {

                    progress = (event.loaded / event.total)*100;
                    console.log("PercentComplete: " + progress);
                    Utils.forEach(progressSubscriberCallbacks, function(subscriberCallback) {
                        subscriberCallback(progress);
                    });

                } else {
                    console.log("length not computable but got the following: ");
                    console.log(event);
                    Utils.forEach(progressSubscriberCallbacks, function(subscriberCallback) {
                        subscriberCallback(progress);
                    });
                }
            }, false);

        };
    });

    ApplaudioComponents.directive("applaudioProgressBar", ["UploadService", function(UploadService) {

        return {
            restrict: "E",
            transclude: true,
            template: "<div class='progress-bar'><div class='progress-display' style='width:{{progress}}px'></div></div>",
            link: function(scope, element, attrs) {

                var progressBar = element[0].getElementsByClassName("progress-display")[0];
                progressBar.style.width = "0%";
                console.log(progressBar);

                console.log(scope);

                UploadService.subscribeForProgressUpdates(function(progress) {
//                    console.log("PROGRESSION: " + progress);
                    progressBar.style.width = progress + "%";
                });

            }

        };
    }]);

    return ApplaudioComponents;

});