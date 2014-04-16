'use strict';

define(["angular"], function (angular) {

    console.log("Defining DirectoryListing module");

    var DirectoryListing = angular.module("DirectoryListing", []);

    console.log("Defining DirectoryListing controller");
    DirectoryListing.controller('DirectoryListingCtrl', function ($rootScope, $scope, $routeParams, $http, $location) {

        console.log("received url: " + $routeParams.url);
        console.log($routeParams);

        $scope.placeholderVisibility = "hidden"; // Don't show placeholder until HTTP request has completed.

        $rootScope.heading = "/" + $routeParams.url + "/";

        $http.get("/api/listing/" + $routeParams.url).
            success(function(data) {
                $scope.listing = data.listing;
                $scope.placeholderVisibility = "visible";
            }).
            error(function(){
                console.log("Cannot find directory in /music/...");
                $scope.listing = ["404"];
                // TODO: 404 (+--0)~~~[~- - ]
            });

        $scope.navigate = function(directoryName) {
            console.log("directoryName: " + directoryName);
            $location.path($location.path() + "/" + directoryName);
        };

        $scope.addDirectory = function() {
            console.log("addDirectory");
            console.log($scope);
            $scope.showAddDirectoryModal = true;
        };

        $scope.uploadMusic = function() {
            console.log("uploadMusic");
        };

        $scope.MODAL_ADD_DIRECTORY = false;

        $scope.showModal = function(modalId) {
            console.log("showModal(" + modalId + ")");
            $scope[modalId] = true;
        };

        $scope.hideModal = function(modalId) {
            console.log("hideModal called from DirectoryListingCtrl scope. modalId: " + modalId);
            console.log($scope);
            $scope[modalId] = false;
        };

    });

    return DirectoryListing;

});