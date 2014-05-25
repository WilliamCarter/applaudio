'use strict';

define(["angular"], function (angular) {

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

    ApplaudioComponents.service("UploadProgress", function(){

        var uploadProgressService = this;

        var progress = 0;
        var subscriberCallbacks = [];

        uploadProgressService.hookUp = function() {
            console.log("Proof it is working");
        };


        uploadProgressService.subscribe = function(callback) {
            subscriberCallbacks.push(callback);
        };


        uploadProgressService.registerProgressEvents = function(xhrUploadObject) {
            console.log("uploadProgressService.registerProgressEvents.");

            xhrUploadObject.addEventListener("load", function(e) {
                console.log("upload successful");
                console.log(e);
            }, false);

            xhrUploadObject.addEventListener("progress", function updateProgress(event) {
                if (event.lengthComputable) {

                    progress = (event.loaded / event.total)*100;
                    console.log("PercentComplete: " + progress);
                    for (var i = 0; i < subscriberCallbacks.length; i++) {
                        subscriberCallbacks[i](progress);
                    }

                } else {
                    console.log("length not computable but got the following: ");
                    console.log(event);
                }
            }, false);

        };
    });

    ApplaudioComponents.directive("applaudioProgressBar", ["UploadProgress", function(UploadProgress) {

        return {
            restrict: "E",
            transclude: true,
            template: "<div class='progress-bar'><div class='progress-display' style='width:{{progress}}px'></div></div>",
            link: function(scope, element, attrs) {

                console.log("Progress Bar Link");
                UploadProgress.hookUp();

                var progressBar = element[0].getElementsByClassName("progress-display")[0];
                progressBar.style.width = "0%";
                console.log(progressBar);

                console.log(scope);

                UploadProgress.subscribe(function(progress) {
                    console.log("PROGRESSION: " + progress);
                    progressBar.style.width = progress + "%";
                });

            }

        };
    }]);

    return ApplaudioComponents;

});