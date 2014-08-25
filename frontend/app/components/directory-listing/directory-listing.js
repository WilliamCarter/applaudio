'use strict';

define([
    "angular",
    "configuration",
    "services/upload"
], function (angular, Config) {

    var DirectoryListing = angular.module("DirectoryListing", ["ApplaudioUpload", "ApplaudioUtilities"]);

    DirectoryListing.service("DirectoryListingService", ["ApplaudioUtils", "$location", "$http", function(ApplaudioUtils, $location, $http) {

        var DirectoryListingService = this;

        var currentPath = function() {
            return $location.path().replace(/^\/listing/, ""); // remove prefix "/listing"
        };

        DirectoryListingService.listing = [];

        DirectoryListingService.loadContent = function () {
            console.log("directoryListingService.getContent()");
            $http.get("/api/library" + currentPath())
                .success(function(data) {
                    console.log(data);
                    DirectoryListingService.listing = data.listing;
                })
                .error(function(){
                    console.log("Cannot find directory in /music/...");
                    DirectoryListingService.listing = ["404"];
                    // TODO: 404 (+--0)~~~[~- - ]
                });
        };

        DirectoryListingService.addDirectory = function(directoryName) {
            console.log("addDirectory(" + currentPath() + ", " + directoryName + ")");
            $http.post(Config.paths.createNewDirectory, { "path" : currentPath(), "name" : directoryName })
                .success(function(){
                    console.log("new directory created successfully.");
                    var directoryPosition = 0;
                    while (directoryName > DirectoryListingService.listing[directoryPosition]) {
                        directoryPosition++;
                    }
                    ApplaudioUtils.insertAt(DirectoryListingService.listing, directoryPosition, directoryName);
                })
                .error(function(data, status){
                    window.alert("Error adding directory. See console");
                    console.log("Error adding directory: " + status);
                    console.log(data);
                });
        };

    }]);

    DirectoryListing.controller('DirectoryListingCtrl', [
        "DirectoryListingService",
        "$scope",
        "$http",
        "$location",
        "ModalService",
        "UploadService",
        "ApplaudioUtils",
    function (DirectoryListingService, $scope, $http, $location, ModalService, UploadService, ApplaudioUtils) {

        var directoryListing = this;

        $scope.$watch(
            function () {
                return DirectoryListingService.listing;
            },
            function (newValue) {
                directoryListing.listing = newValue;
            }
        );

        DirectoryListingService.loadContent();

        directoryListing.navigate = function(directoryName) {
            console.log("directoryName: " + directoryName);
            $location.path($location.path() + "/" + directoryName);
        };


    }

//            controllerScope.uploadMusic = function() {
//                console.log("uploadMusic");
//
//                ModalService.show({
//                    heading : "Upload Music",
//                    upload : {
//                        show : true
//                    },
//                    confirm : {
//                        show : true,
//                        text : "Upload",
//                        action : function(hideHook){
//                            console.log("modal confirm button clicked");
//
//                            UploadService.upload($scope.currentPath);
//
//                            ModalService.update({
//                                upload : {
//                                    inProgress : true
//                                }
//                            });
//                        }
//                    },
//                    onDismiss : function() {
//                        console.log("onDismiss called from directory listing.");
//                        getContent();
//                    }
//                });
//            };
//
//            getContent();
//        }

    ]);

    return DirectoryListing;

});