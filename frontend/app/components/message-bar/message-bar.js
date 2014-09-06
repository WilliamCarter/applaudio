'use strict';

define([
    "angular"
], function(angular) {

    var MessageBar = angular.module('MessageBar', ["applaudio"]);

    'use strict';
    MessageBar.factory('MessageBarService', function() {

        var messageQueue = [];

        var messageId = 0;

        function addMessage(message, type) {
            console.log("MessageBarService.addMessage(" + message + ", " + type + ")");
            if (type === undefined) {
                type = "standard";
            }
            messageQueue.push({
                "id": messageId++,
                "message": message,
                "type": type
            });
        }

        function removeMessage() {
            return messageQueue.shift();
        }

        return {
            messageQueue : messageQueue,
            addMessage : addMessage,
            removeMessage : removeMessage
        };

    });


    MessageBar.controller('MessageBarCtrl', [
        "$scope",
        "$interval",
        "MessageBarService",
        "configuration",
    function ($scope, $interval, MessageBarService, configuration) {

            $scope.message = '';
            $scope.type = 'standard'; // "standard" or "error"
            $scope.visible = false;

            $scope.show = function (messageObject) {
                $scope.message = messageObject.message;
                $scope.type = messageObject.type;
                $scope.visible = true;

                $interval(function () {
                    $scope.dismiss();
                    MessageBarService.removeMessage();
                }, configuration.messageBar.showDuration, 1);
            };

            $scope.dismiss = function () {
                $scope.visible = false;
            };

            $scope.$watch(
                function () {
                    if (MessageBarService.messageQueue.length > 0) {
                        return MessageBarService.messageQueue[0].id;
                    } else {
                        return -1;
                    }
                },

                function () {
                    if (MessageBarService.messageQueue[0] !== undefined) {
                        $scope.show(MessageBarService.messageQueue[0]);
                    }
                }
            );

        }
    ]);

    return MessageBar;

});
