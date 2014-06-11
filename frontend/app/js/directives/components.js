'use strict';

define(["angular", "globals"], function (angular, Globals) {

    console.log("Defining ApplaudioComponents");

    var ApplaudioComponents = angular.module("ApplaudioComponents", ["ApplaudioUtilities"]);

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

    ApplaudioComponents.service("UploadService", ["ApplaudioUtils", function(Utils){

        var UploadService = this;

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

    ApplaudioComponents.directive("applaudioProgressBar", ["UploadService", function(UploadService) {

        return {
            restrict: "E",
            transclude: true,
            template: "<div class='progress-bar'><div class='progress-display' ng-style=\"{width: progress + '%'}\"></div></div>",
            scope: {
                progress: '='
            }
        };

    }]);

    return ApplaudioComponents;

});