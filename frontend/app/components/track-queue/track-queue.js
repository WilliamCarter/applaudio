define([
    "angular",
    "angularUiTree"
], function (angular) {

    var ApplaudioTrackQueue = angular.module("ApplaudioTrackQueue", ["ui.tree"]);

    ApplaudioTrackQueue.service('TrackQueueService', [ function() {

        var TrackQueueService = this;

        TrackQueueService.queue = [];

        TrackQueueService.queueTrack = function(track) {
            TrackQueueService.queue.push(track);
        };

        TrackQueueService.getNext = function() {
            return TrackQueueService.queue.shift();
        };

        return TrackQueueService;

    }]);

    ApplaudioTrackQueue.controller("TrackQueueCtrl", [
        "$scope",
        "TrackQueueService",
    function($scope, TrackQueueService) {

        $scope.queue = TrackQueueService.queue;

    }]);

    return ApplaudioTrackQueue;
});
