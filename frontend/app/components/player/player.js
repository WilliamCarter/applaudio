'use strict';

define([
    "angular"
], function (angular) {

    var ApplaudioPlayer = angular.module("ApplaudioPlayer", []);

    ApplaudioPlayer.service("ApplaudioPlayerService", function() {

        var PlayerService = this;

        PlayerService.track = null;

        return PlayerService;
    });


    ApplaudioPlayer.directive('applaudioPlayer', function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "components/player/player.html",
            link: function ($scope, $element, $attrs) {
                console.log("ApplaudioPlayer");
                $scope.track = {
                    name: "Reasonably long name.mp3"
                }
            }
        }
    });


    return ApplaudioPlayer;

});
