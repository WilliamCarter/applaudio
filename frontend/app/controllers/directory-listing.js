'use strict';

define([
    "angular",
    "globals"
], function (angular, Globals) {

    console.log("Defining DirectoryListing module");

    var DirectoryListing = angular.module("DirectoryListing", ["ApplaudioComponents", "ApplaudioUtilities"]);

    console.log("Defining DirectoryListing controller");
    DirectoryListing.controller('DirectoryListingCtrl', ["$scope", "$http", "$location", "ModalService", "UploadService", "ApplaudioUtils",
        function ($scope, $http, $location, ModalService, UploadService, ApplaudioUtils) {

            var controllerScope = this;

            controllerScope.placeholderVisibility = "hidden"; // Don't show placeholder until HTTP request has completed.

            var getContent = function () {
                $http.get("/api/library/" + $scope.currentPath).
                    success(function(data) {
                        controllerScope.listing = data.listing;
                        controllerScope.placeholderVisibility = "visible";
                    }).
                    error(function(){
                        console.log("Cannot find directory in /music/...");
                        controllerScope.listing = ["404"];
                        // TODO: 404 (+--0)~~~[~- - ]
                    });
            };

            controllerScope.navigate = function(directoryName) {
                console.log("directoryName: " + directoryName);
                $location.path($location.path() + "/" + directoryName);
            };

            controllerScope.addDirectory = function() {

                console.log("addDirectory()");

                ModalService.show({
                    confirm : {
                        action : function(hideHook) {
                            console.log("modal confirm button clicked");
                            var path = $scope.currentPath;
                            var directoryName = ModalService.attributes.textInput.content; // This is very confusing way to reference the input data.

                            console.log("Add directory: " + path + directoryName);

                            if(controllerScope.listing.indexOf(directoryName) !== -1) {
                                console.log("Directory already exists in current model. Scroll to element.");
                                document.querySelector("#directory_" + ApplaudioUtils.htmlify(directoryName)).scrollIntoView();
                                // TODO: smooth scroll. Add element highlight as well?
                            } else {
                                $http.post(Globals.paths.createNewDirectory, { "path" : path, "name" : directoryName })
                                    .success(function(){
                                        console.log("new directory created successfully.");
                                        var directoryPosition = 0;
                                        while (directoryName > controllerScope.listing[directoryPosition]) {
                                            directoryPosition++;
                                        }
                                        ApplaudioUtils.insertAt(controllerScope.listing, directoryPosition, directoryName);
                                    })
                                    .error(function(data, status){
                                        window.alert("Error adding directory. See console");
                                        console.log("Error adding directory: " + status);
                                        console.log(data);
                                    });
                            }
                            hideHook();
                        },
                        text : "Add",
                        show : true
                    },
                    heading : "Add Directory",
                    textInput : {
                        placeholder: "name",
                        show : true,
                        tag : "Directory name: "
                    },

                });
            };

            controllerScope.uploadMusic = function() {
                console.log("uploadMusic");

                ModalService.show({
                    heading : "Upload Music",
                    upload : {
                        show : true
                    },
                    confirm : {
                        show : true,
                        text : "Upload",
                        action : function(hideHook){
                            console.log("modal confirm button clicked");

//                            UploadService.prepareItem("path", $scope.currentPath);
                            UploadService.upload($scope.currentPath);

                            ModalService.update({
                                upload : {
                                    inProgress : true
                                }
                            });
                        }
                    },
                    onDismiss : function() {
                        console.log("onDismiss called from directory listing.");

                        getContent();
                    }
                });
            };

            getContent();
        }

    ]);

    return DirectoryListing;

});