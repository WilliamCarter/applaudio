'use strict'

console.log("Defining ListingCtrl");

var DirectoryListing = angular.module("DirectoryListing", []);

DirectoryListing.controller('DirectoryListingCtrl', function ($scope, $routeParams, $http) {

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

});
