'use strict';

define([
    "angular",
    "angularAnimate",
    "angularRoute",

    "ui/scrollable/scrollable",
    "ui/progress-bar/progress-bar",

    "components/modal/modal",

    "controllers/base",
    "controllers/directory-listing",
    "directives/repeat-events",

    "services/upload",

    "filters",
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

    window.onscroll = function(e) {
        console.log("scroll");
        console.log(e);
    };

    console.log("Defining Applaudio");
    var Applaudio = angular.module('applaudio', [
        "ngRoute",
        "ngAnimate",

        "BaseCtrlModule",
        "DirectoryListing",

        "ApplaudioUI",
        "ApplaudioUpload",
        "ApplaudioModal",
        "applaudioFilters",

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