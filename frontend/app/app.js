'use strict';

define([
    "angular",
    "angularAnimate",
    "angularRoute",

    "services/utils",

    "ui/scrollable/scrollable",
    "ui/progress-bar/progress-bar",
    "ui/modal/modal",

    "components/base/base",
    "components/message-bar/message-bar",
    "components/directory-listing/directory-listing",
    "components/directory-listing/listing-item/listing-item",
    "components/directory-listing/upload-modal/upload-modal",
    "components/directory-listing/add-directory-modal/add-directory-modal",


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

    console.log("Defining Applaudio");
    var Applaudio = angular.module('applaudio', [
        "ngRoute",
        "ngAnimate",

        "Base",
        "MessageBar",
        "DirectoryListing",

        "ApplaudioUI",
        "ApplaudioUtilities"
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