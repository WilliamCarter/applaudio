define(["ui/ui"], function (ApplaudioUI) {

    ApplaudioUI.directive("infiniteLabel", ["$interval", function($interval) {

        return {
            restrict: "E",
            replace: true,
            scope: {
                content: '=',
                speed: '=',
                pause: '='
            },
            templateUrl: "ui/infinite-label/infinite-label.html",
            link: function($scope, $element, $attrs) {
                var speed = $scope.speed || 1;
                var pause = $scope.pause || 2;

                var container = $element[0];
                var content = $element.children()[0];

                var marginLeft = 0;

                var interval;


                var setX = function(x) {
                    console.log("set(" + x + ")");
                    marginLeft = x || 0;
                    content.style.marginLeft = marginLeft + "px";
                }

                var updateX = function(dx) {
                    console.log("update(" + dx + ")");
                    marginLeft += dx || 0;
                    content.style.marginLeft = marginLeft + "px";
                };

                var startAutomaticUpdates = function() {

                    interval = $interval(function() {
                        if (-marginLeft > content.offsetWidth) {
                            setX(container.offsetWidth + 10);
                        } else {
                            updateX(-speed);
                            if (marginLeft >= 0 && marginLeft < speed) {
                                startAutomaticUpdatesAfter(pause);
                            }
                        }
                    }, 40);
                };

                var startAutomaticUpdatesAfter = function(delay) {
                    stopAutomaticUpdates();
                    $interval(startAutomaticUpdates, delay*1000, 1);
                };

                var stopAutomaticUpdates = function() {
                    if (interval !== undefined) {
                        $interval.cancel(interval);
                    }
                };

                var startManualUpdates = function() {
                    stopAutomaticUpdates();

                    var updateMoves = function(event) {
                        updateX(event.movementX);
                    };

                    var stopManualUpdates = function() {
                        window.removeEventListener('mousemove', updateMoves);
                        window.removeEventListener('mouseup', stopManualUpdates);
                        startAutomaticUpdates();
                    };

                    window.addEventListener('mousemove', updateMoves);
                    window.addEventListener('mouseup', stopManualUpdates);

                };

                $scope.$watch(function() {
                    return content.offsetWidth;
                }, function() {
                    if (content.offsetWidth > container.offsetWidth) {
                        startAutomaticUpdatesAfter(pause);
                    } else {
                        // Stop if width can be contained.
                        stopAutomaticUpdates();
                        marginLeft = 0;
                        content.style.marginLeftx = marginLeft + "px";
                    }
                });

                content.addEventListener('mousedown', startManualUpdates);

            }
        };
    }]);
});