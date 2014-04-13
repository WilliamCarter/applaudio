'use strict';

define(["angular"], function (angular) {

    var ApplaudioComponents = angular.module("ApplaudioComponents", []);

    ApplaudioComponents.directive('applaudioModal', function () {

        return {
            restrict: "E",
            scope: {
                show: "="
            },
            replace: true,
            transclude: true,
            link: function (scope, element, attrs) {

                // Allow style to be configured as attributes.
                scope.configurableStyle = {
                    width: "50%",
                    height: "40%"
                };
                for (var style in scope.configurableStyle) {
                    scope.configurableStyle[style] = attrs[style] || scope.configurableStyle[style];
                }

                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            templateUrl: 'views/modal.html'
        };

    });

    return ApplaudioComponents;

});