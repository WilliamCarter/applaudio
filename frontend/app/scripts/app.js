'use strict';

define([
    "angular",
    "angularAnimate",
    "angularRoute",
    "components",
    "controllers/master",
    "controllers/directory-listing",
    "../404/controller"
], function(angular) {

    console.log("Defining Applaudio");
    var Applaudio = angular.module('applaudio', [
        "ngRoute",
        "ngAnimate",

        "MasterCtrlModule",
        "ApplaudioComponents",
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
            templateUrl: '/views/main.html',
        }).
        otherwise({
            templateUrl: '/404/view.html',
            controller: "FourOhFourCtrl"
        });

    }]);

      return Applaudio;
});