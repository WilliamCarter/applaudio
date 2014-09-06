'use strict';

define([
    "angular",
    "configuration",
    "components/directory-listing/file",
    "services/utils",
    "services/upload"
], function (angular, Config, File) {

    var DirectoryListing = angular.module("DirectoryListing", ["ApplaudioUpload", "ApplaudioUtilities"]);


    DirectoryListing.service("DirectoryListingService", [
        "ApplaudioUtils",
        "$location",
        "$http",
    function(ApplaudioUtils, $location, $http) {

        var DirectoryListingService = this;

        DirectoryListingService.currentPath = function() {
            return $location.path().replace(/^\/listing/, ""); // remove prefix "/listing"
        };

        DirectoryListingService.listing = [];

        DirectoryListingService.navigate = function(directoryName) {
            console.log("navigate(" + directoryName + ")");
            $location.path($location.path() + "/" + directoryName);
        };

        DirectoryListingService.loadContent = function () {
            console.log("directoryListingService.getContent()");
            $http.get(Config.paths.api.getDirectory + DirectoryListingService.currentPath())
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
            console.log("addDirectory(" + DirectoryListingService.currentPath() + ", " + directoryName + ")");
            $http.post(Config.paths.api.createDirectory, { "path" : DirectoryListingService.currentPath(), "name" : directoryName })
                .success(function(){
                    console.log("new directory created successfully.");
                    var directoryPosition = 0;
                    while (directoryName > DirectoryListingService.listing[directoryPosition]) {
                        directoryPosition++;
                    }
                    DirectoryListingService.listing.push(new File(directoryName, "directory"));
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
    function (DirectoryListingService, $scope) {

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

        $scope.accountForArtists = function(directory) {
            // Convert to lower case and remove preceding "The " if necessary
            if (DirectoryListingService.currentPath() === "/artists") {
                return directory.label.toLowerCase().replace(/^the /, "");
            } else {
                return directory.label.toLowerCase();
            }
        };


    }]);


    return DirectoryListing;

});