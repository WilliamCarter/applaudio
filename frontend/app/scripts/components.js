'use strict';

define(["angular"], function (angular) {

    var ApplaudioComponents = angular.module("ApplaudioComponents", []);

    // Button
    ApplaudioComponents.directive('applaudioButton', function () {

        return {
            restrict: "E",
            scope: {
                ngDisabled : "=", // pass ngDisabled attribute on to button child.
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
                    width: "50%"
                };
                for (var style in scope.configurableStyle) {
                    scope.configurableStyle[style] = attrs[style] || scope.configurableStyle[style];
                }

                scope.hideThisModal = function() {
                    console.log("hideThisModal() called from Modal");
                    scope.modalId = false;
                };

                // watch expression must be a function.
                scope.$watch(function(){ return scope.modalId; }, function(value){
                    if (value) {
                        console.log("focusing input");
                        element[0].querySelector("#directory-input").focus();
                    }
                });

            },
            templateUrl: 'views/components/modal.html'
        };

    });

    return ApplaudioComponents;

});