'use strict';

define(["angular"], function (angular) {

    var MasterCtrlModule = angular.module("MasterCtrlModule", []);

    console.log("Defining Master controller");
    MasterCtrlModule.controller('MasterCtrl', function ($scope) {

        $scope.printSomething = function() {
            console.log("COOKIES!");
        };
    });

    return MasterCtrlModule;

});