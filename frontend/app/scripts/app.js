'use strict';

define([
    "angular",
    "angularAnimate",
    "angularRoute",
    "controllers/listing",
    "../404/controller"
], function(angular) {

    console.log("Defining Applaudio");
    var Applaudio = angular.module('applaudio', [
        "ngRoute",
        "ngAnimate",

        "DirectoryListing",
        "FourOhFour"
    ]);

    console.log("Configuring Applaudio");
    Applaudio.config(["$routeProvider", function($routeProvider) {

        $routeProvider.
        when('/', {
            redirectTo : '/listing/artists'
        }).
        when('/listing/:url*', {
            templateUrl: '/views/listing.html',
            controller: 'DirectoryListingCtrl'
        }).
        otherwise({
//            redirectTo : '/listing/artists'
            templateUrl: '/404/view.html',
            controller: "FourOhFourCtrl"
        });

    }]);

      return Applaudio;
});