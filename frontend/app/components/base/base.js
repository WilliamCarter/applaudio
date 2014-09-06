'use strict';

define(["angular"], function (angular) {

    var Base = angular.module("Base", ["ApplaudioUtilities", "applaudio"]);

    Base.controller('BaseCtrl', [
        "$scope",
        "$routeParams",
        "ApplaudioUtils",
        "configuration",
    function ($scope, $routeParams, Utils, configuration) {

        var base = this; // private variables are attached to 'base', public to '$scope'

        // currentPath is set by the URL path.
        console.log("base controller - received url: " + $routeParams.url);
        $scope.currentPath = "/" + $routeParams.url + "/";
        base.currentPathElements = $scope.currentPath.split("/").slice(1, $scope.currentPath.length-1);

        base.supportedMedia = configuration.supportedMedia;

        console.log("Defining utility functions...");

        // NAVIGATION //
        base.linkBackToDepth = function(index) {
            return "/#/listing/" + base.currentPathElements.slice(0, index+1).join("/");
        };

    }]);

    Base.directive('repeatEnd', function () {

        // This is a hook for executing code after an ng-repeat has rendered.

        return function(scope, element, attrs) {
            if (scope.$last){
                eval(attrs.repeatEnd);
            }
        };

    });


    return Base;

});