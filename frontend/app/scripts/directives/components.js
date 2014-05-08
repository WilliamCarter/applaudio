'use strict';

define(["angular"], function (angular) {

    var ApplaudioComponents = angular.module("ApplaudioComponents", []);

//    // Modal
//    ApplaudioComponents.directive('applaudioModal', function () {
//
//        return {
//            restrict: "E",
//            scope: {
//                modalId: "="
//            },
//            replace: true,
//            transclude: true,
//            link: function (scope, element, attrs) {
//
//                // Allow style to be configured as attributes.
//                scope.configurableStyle = {
//                    width: "50%"
//                };
//                for (var style in scope.configurableStyle) {
//                    scope.configurableStyle[style] = attrs[style] || scope.configurableStyle[style];
//                }
//
//                scope.hideThisModal = function() {
//                    console.log("hideThisModal() called from Modal");
//                    scope.modalId = false;
//                };
//
//                // watch expression must be a function.
//                scope.$watch(function(){ return scope.modalId; }, function(value){
//                    if (value) {
//                        console.log("focusing input");
//                        element[0].querySelector("#directory-input").focus();
//                    }
//                });
//
//            },
//            templateUrl: 'views/components/modal.html'
//        };
//
//    });

    ApplaudioComponents.directive("applaudioScrollable", function() {

        return {
            restrict: "E",
            transclude: true,
            templateUrl: "views/components/scrollable.html",
            link: function(scope, element, attrs) {

                var scrollable = element[0].children[0];
                window.scrollable = scrollable;
                var topFade = element[0].children[1];
                var bottomFade = element[0].children[2];

                console.log(scrollable);
                scrollable.onscroll = function() {

                    if (scrollable.scrollTop > 4) {
                        topFade.hidden = false;
                    } else {
                        topFade.hidden = true;
                    }

                    if (scrollable.scrollHeight - (scrollable.scrollTop + scrollable.clientHeight) < 4) {
                        bottomFade.hidden = true;
                    } else {
                        bottomFade.hidden = false;
                    }

                };

            }
        };
    });

    return ApplaudioComponents;

});