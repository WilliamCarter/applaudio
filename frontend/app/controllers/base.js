'use strict';

define(["angular", "configuration"], function (angular, Config) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", ["ApplaudioUtilities"]);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', ["$scope", "$routeParams", "ApplaudioUtils", function ($scope, $routeParams, Utils) {

        var base = this; // private variables are attached to 'base', public to '$scope'

        // currentPath is set by the URL path.
        console.log("base controller - received url: " + $routeParams.url);
        $scope.currentPath = "/" + $routeParams.url + "/";
        base.currentPathElements = $scope.currentPath.split("/").slice(1, $scope.currentPath.length-1);

        base.supportedMedia = Config.supportedMedia;

        console.log("Defining utility functions...");

        // UTILITY FUNCTIONS //
        $scope.htmlify = function(string) {
        // Copy the Utils function to allow views to use it.
            console.log("HTMLify");
            return Utils.htmlify(string);
        };

        // NAVIGATION //
        base.linkBackToDepth = function(index) {
            return "/#/listing/" + base.currentPathElements.slice(0, index+1).join("/");
        };

    }]);

    return BaseCtrlModule;

});