'use strict';

define([
    "angular",
    "components/directory-listing/file",
    "services/utils",
    "services/upload"
], function (angular, File) {

    var DirectoryListing = angular.module("DirectoryListing", ["applaudio", "ApplaudioUpload", "ApplaudioUtilities", "MessageBar"]);

    DirectoryListing.service("DirectoryListingService", [
        "ApplaudioUtils",
        "$location",
        "$http",
        "MessageBarService",
        "configuration",
    function(ApplaudioUtils, $location, $http, MessageBarService, configuration) {

        var DirectoryListingService = this;

        DirectoryListingService.currentPath = function() {
            return $location.path().replace(/^\/listing/, ""); // remove prefix "/listing"
        };

        DirectoryListingService.listing = [];

        DirectoryListingService.navigate = function(directoryName) {
            console.log("DirectoryListingService.navigate(" + directoryName + ")");
            $location.path($location.path() + "/" + directoryName);
        };

        DirectoryListingService.loadContent = function () {
            console.log("DirectoryListingService.loadContent()");
            var path = DirectoryListingService.currentPath();
            $http.get(configuration.paths.api.getDirectory + path)
                .success(function(data) {
                    console.log(data);
                    DirectoryListingService.listing = data.listing;
                })
                .error(function(){
                    MessageBarService.addMessage("Could not find the directory '" + path + "' in the library", "error");
                    console.log("Cannot find directory in /music/...");
                    DirectoryListingService.listing = [];
                });
        };

        DirectoryListingService.addDirectory = function(directoryName) {
            console.log("addDirectory(" + DirectoryListingService.currentPath() + ", " + directoryName + ")");
            $http.post(configuration.paths.api.createDirectory, { "path" : DirectoryListingService.currentPath(), "name" : directoryName })
                .success(function(){
                    console.log("new directory created successfully.");
                    MessageBarService.addMessage("Directory '" + directoryName + "' added successfully");
                    var directoryPosition = 0;
                    while (directoryName > DirectoryListingService.listing[directoryPosition]) {
                        directoryPosition++;
                    }
                    DirectoryListingService.listing.push(new File(directoryName, "directory"));
                })
                .error(function(data, status){
                    MessageBarService.addMessage("There was an error adding the directory '" + directoryName + "'", "error");
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