define([
    "angular",
    "angularUiTree"
], function (angular) {

    var ApplaudioTrackQueue = angular.module("ApplaudioTrackQueue", ["ui.tree"]);

    ApplaudioTrackQueue.controller("TrackQueueCtrl", [
        "$scope",
    function($scope) {

        $scope.queue = [
            { name: "Walk the Line - Johnny Cash" },
            { name: "Hurt - Johnny Cash" }
        ];
    }]);

    return ApplaudioTrackQueue;
});
