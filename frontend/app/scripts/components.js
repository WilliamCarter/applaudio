'use strict';

define(["angular"], function (angular) {

    var ApplaudioComponents = angular.module("ApplaudioComponents", []);

    // Button
    ApplaudioComponents.directive('applaudioButton', function () {

        return {
            restrict: "E",
            scope: {
                action : "&" // execute passed action in parent scope.
            },
            transclude: true,
            link: function (scope, element, attrs) {

                if (attrs.icon) {
                    scope.icon = true;
                    scope.iconSrc = attrs.icon;
                } else {
                    scope.buttonStyle = {
                        'text-align' : 'center',
                        "padding-left" : "10px"
                    };
                }

            },
            templateUrl: 'views/components/button.html'
        };

    });

    // Modal
    ApplaudioComponents.directive('applaudioModal', function () {

        return {
            restrict: "E",
            scope: {
                modalId: "="
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

                scope.hideThisModal = function() {
                    // Could we alternatively inject the modal ID into the view and use hideModal(modalID) from the base/master controller?
                    scope.show = !scope.show;
                };

            },
            templateUrl: 'views/components/modal.html'
        };

    });

    return ApplaudioComponents;

});