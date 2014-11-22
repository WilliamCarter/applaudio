define([
    "angular",
    "howler"
], function (angular) {

    var ApplaudioPlayer = angular.module("ApplaudioPlayer", []);

    ApplaudioPlayer.controller("PlayerCtrl", [
        "$scope",
        "PlayerService",
    function($scope, PlayerService) {

        $scope.bindings = PlayerService.bindings;

        $scope.playPauseLabel = function() {
            if ($scope.bindings.track !== null && !$scope.bindings.paused) {
                return "||";
            } else {
                return "Play";
            }
        };

        $scope.playPause = PlayerService.play;
    }]);

    ApplaudioPlayer.service("PlayerService", function() {

        var PlayerService = this;

        var howly = null;

        PlayerService.bindings = {
            paused: true,
            track : null
        };

        PlayerService.setTrack = function(track) {
            PlayerService.bindings.track = track;
            howly = new Howl({ urls: [track.location] });
        };

        PlayerService.play = function() {
            console.log("Playing " + PlayerService.bindings.track.label);
            PlayerService.bindings.paused = false;
            howly.play();
        };

    });


    return ApplaudioPlayer;

});
