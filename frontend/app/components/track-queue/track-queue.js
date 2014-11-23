define([
    "angular",
    "catext/catext-arrays",
    "angularUiTree"
], function (angular, ArraysExtension) {

    var ApplaudioTrackQueue = angular.module("ApplaudioTrackQueue", ["MessageBar", "ui.tree"]);

    ApplaudioTrackQueue.service('TrackQueueService', [ "MessageBarService", "configuration", function(MessageBarService, configuration) {

        var TrackQueueService = this;

        TrackQueueService.queue = [];

        TrackQueueService.queueTrack = function(track) {
            var containsLocation = function(otherTrack) {
                return track.location === otherTrack.location;
            };
            if (ArraysExtension.contains(TrackQueueService.queue, containsLocation)) {
                console.log("Track already in queue");
                MessageBarService.addMessage(configuration.alerts.trackQueueDuplicates);
            } else {
                console.log("Add track to queue");
                TrackQueueService.queue.push(track);
            }
        };

        TrackQueueService.isEmpty = function() {
            return TrackQueueService.queue.length === 0;
        };

        TrackQueueService.getNext = function() {
            return TrackQueueService.isEmpty() ? null : TrackQueueService.queue.shift();
        };

        return TrackQueueService;

    }]);

    ApplaudioTrackQueue.controller("TrackQueueCtrl", [
        "$scope",
        "TrackQueueService",
    function($scope, TrackQueueService) {

        $scope.queueEvents = {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                console.log("accept");
                return true;
            },
            drop: function(event) {
                console.log("dropped");
                console.log(event);
            }
        };

        $scope.queue = TrackQueueService.queue;
        $scope.$watch(function() { return TrackQueueService.queue.length; }, function(newQueue, oldQueue) {
            console.log("Queue changed");
            console.log(TrackQueueService.queue.map(function(track){ return track.label; }));
        });

    }]);

    return ApplaudioTrackQueue;
});
