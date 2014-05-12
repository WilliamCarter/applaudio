'use strict';

define(["angular"], function (angular) {

    var ApplaudioComponents = angular.module("ApplaudioComponents", []);

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