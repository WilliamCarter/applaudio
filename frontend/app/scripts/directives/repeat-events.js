'use strict';

define(["angular"], function (angular) {

    var RepeatEvents = angular.module("RepeatEvents", []);

    RepeatEvents.directive('repeatEnd', function () {

        return function(scope, element, attrs) {
            if (scope.$last){
                console.log(attrs);
                window.resizeApplication();
            }
        };

    });

    return RepeatEvents;

});