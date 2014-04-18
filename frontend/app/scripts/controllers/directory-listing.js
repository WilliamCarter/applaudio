'use strict';

define(["angular"], function (angular) {

    console.log("Defining DirectoryListing module");

    var DirectoryListing = angular.module("DirectoryListing", []);

    console.log("Defining DirectoryListing controller");
    DirectoryListing.controller('DirectoryListingCtrl', function ($scope, $routeParams, $http, $location) {

        console.log("received url: " + $routeParams.url);
        console.log($routeParams);

        var controllerScope = this;

        controllerScope.placeholderVisibility = "hidden"; // Don't show placeholder until HTTP request has completed.

        $scope.$parent.currentPath = "/" + $routeParams.url + "/";

        $http.get("/api/listing/" + $routeParams.url).
            success(function(data) {
                controllerScope.listing = data.listing;
                controllerScope.placeholderVisibility = "visible";
            }).
            error(function(){
                console.log("Cannot find directory in /music/...");
                controllerScope.listing = ["404"];
                // TODO: 404 (+--0)~~~[~- - ]
            });

        controllerScope.navigate = function(directoryName) {
            console.log("directoryName: " + directoryName);
            $location.path($location.path() + "/" + directoryName);
        };

        controllerScope.addDirectory = function(directoryName) {
            console.log("addDirectory(" + directoryName + ")");
            controllerScope.hideModal();
        };

        controllerScope.uploadMusic = function() {
            console.log("uploadMusic");
        };

        controllerScope.modals = {
            MODAL_ADD_DIRECTORY : false
        };

        controllerScope.showModal = function(modalId) {
            console.log("DirectoryListingCtrl - showModal(" + modalId + ")");
            controllerScope.modals[modalId] = true;
        };

        controllerScope.hideModal = function() {
            console.log("DirectoryListingCtrl - hideModal()");
            for (var modalId in controllerScope.modals) {
                controllerScope.modals[modalId] = false;
            }
        };

    });

    return DirectoryListing;

});