'use strict';

define(["angular"], function (angular) {

    console.log("Defining DirectoryListing module");

    var DirectoryListing = angular.module("DirectoryListing", []);

    console.log("Defining DirectoryListing controller");
    DirectoryListing.controller('DirectoryListingCtrl', function ($scope, $routeParams, $http, $location) {

        console.log("received url: " + $routeParams.url);
        console.log($routeParams);

        $http.get("/api/listing/" + $routeParams.url).
            success(function(data) {
                $scope.listing = data.listing;
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

    });

    console.log("Defined DirectoryListing module");

    return DirectoryListing;

});