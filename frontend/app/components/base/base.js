'use strict';

define(["angular", "configuration"], function (angular, Config) {

    var Base = angular.module("Base", ["ApplaudioUtilities"]);

    Base.controller('BaseCtrl', ["$scope", "$routeParams", "ApplaudioUtils", function ($scope, $routeParams, Utils) {

        var base = this; // private variables are attached to 'base', public to '$scope'

        // currentPath is set by the URL path.
        console.log("base controller - received url: " + $routeParams.url);
        $scope.currentPath = "/" + $routeParams.url + "/";
        base.currentPathElements = $scope.currentPath.split("/").slice(1, $scope.currentPath.length-1);

        base.supportedMedia = Config.supportedMedia;

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