'use strict';

define(["angular"], function (angular) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", []);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', function ($scope) {

        $scope.currentPath = "/";
    });

    return BaseCtrlModule;

});