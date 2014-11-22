'use strict';

define([
    "angular",
    "angularUiTree"
], function (angular) {

    var ApplaudioTrackQueue = angular.module("ApplaudioTrackQueue", ["ui.tree"]);

    ApplaudioTrackQueue.controller("TrackQueueCtrl", [
        "$scope",
    function($scope) {

        $scope.queue = [];
    }]);

    return ApplaudioTrackQueue;
});