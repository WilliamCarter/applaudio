'use strict';

define([
    "angular",
    "angularAnimate",
    "angularRoute",
    "controllers/base",
    "controllers/directory-listing",
    "directives/repeat-events",
    "directives/components",
    "../404/controller"
], function(angular) {

    // Hack to fix application height. Can't seem to do this with CSS alone.
    window.resizeApplication = function() {
        var header = document.getElementById("application-header");
        var lowerContent = document.getElementById("lower-content");
        lowerContent.style.height = (window.innerHeight - header.clientHeight - 20) + "px";
    };
    window.onresize = function() {
        console.log("resize");
        window.resizeApplication();
    };
//    setTimeout(resizeApplication, 100); // Hack to ensure application starts at the correct size.
//    // TODO: find angular event to hook into, rather than waiting for a set timeout.

    console.log("Defining Applaudio");
    var Applaudio = angular.module('applaudio', [
        "ngRoute",
        "ngAnimate",

        "BaseCtrlModule",
        "DirectoryListing",

        "ApplaudioComponents",
        "RepeatEvents",

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