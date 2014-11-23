define(["ui/ui"], function (ApplaudioUI) {

    ApplaudioUI.directive('applaudioDraggable', function () {
        return {
            restrict: 'A',
            scope: {
                dragData: "="
            },
            link: function ($scope, $element, $attrs) {

                var element = $element[0];

                element.draggable = true;

                element.addEventListener("dragstart", function (dragEvent) {
//                    console.log("dragstart");
//                    console.log(dragEvent);
//                    console.log($scope.dragData);
                    dragEvent.dataTransfer.effectAllowed = 'move';
                    dragEvent.dataTransfer.dragEffect = 'move';
                    dragEvent.dataTransfer.setData('dragData', JSON.stringify($scope.dragData)); // Cannot set objects as drag data! Gaaaa!
                    $element.addClass("drag");
                });

            }
        };
    });

    ApplaudioUI.directive('applaudioDropArea', [ "$parse", function ($parse) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {

                var element = $element[0];
                var onDropCallback = $parse($attrs.onDrop);

                element.addEventListener('dragover', function (dragEvent) {
                    $element.addClass("drop-imminent");
                    dragEvent.preventDefault();
                });

                element.addEventListener('dragenter', function (dragEvent) {
                    console.log("dragenter");
                    $element.addClass("drop-imminent");
                });

                element.addEventListener('dragleave', function (dragEvent) {
                    console.log("dragleave");
                    $element.removeClass("drop-imminent");
                });

                element.addEventListener('drop', function (dropEvent) {
                    var data = JSON.parse(dropEvent.dataTransfer.getData('dragData'));
                    onDropCallback($scope, { track: data });
                    $element.removeClass("drop-imminent");
                    dropEvent.preventDefault();
                });
            }
        };
    }]);
});