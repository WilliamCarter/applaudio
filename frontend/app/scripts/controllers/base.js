'use strict';

define(["angular", "utils"], function (angular, Utils) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", []);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', function ($scope) {

        $scope.currentPath = "/";

        // Copy the Utils function to allow views to use it.
        $scope.htmlify = function(string) {
//            console.log("BaseCtrl.htmlify(" + string + ")");
            return Utils.htmlify(string);
        };

    });

    return BaseCtrlModule;

});