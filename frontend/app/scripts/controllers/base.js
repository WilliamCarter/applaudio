'use strict';

define(["angular", "utils"], function (angular, Utils) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", []);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', function ($scope) {

        // currentPath is set by the URL path.
        $scope.currentPath = "/";


        // UTILITY FUNCTIONS //

        // Copy the Utils function to allow views to use it.
        $scope.htmlify = function(string) {
//            console.log("BaseCtrl.htmlify(" + string + ")");
            return Utils.htmlify(string);
        };


        // MODALS //

        var defaultModal = {
            show : false,
            heading : "",
            showTextInput : false,
            textInputTag : "",
            textInputPlaceholder : "",
            showFileInput : false,
            fileInputTag : "",
            clickFileInput : function() {
                console.log("modal.clickFileInput()");
                document.querySelector("#modal-file-input").click();
            },
            readUploadFiles : function() {
                console.log("modal.readUploadFiles()");
                $scope.$apply(function(){
                    $scope.modal.uploadFiles = document.querySelector("#modal-file-input").files;
                });
            },
            cancelText : "Cancel",
            showConfirm : false,
            hide : function() { $scope.modal.show = false; },
            confirmText : "Ok",
            confirm : null
        };
        $scope.modal = defaultModal;

        $scope.showModal = function(modalAttributes) {
            console.log("BaseCtrl.showModal()");
            $scope.modal = angular.copy(defaultModal);
            for (var attribute in modalAttributes) {
                $scope.modal[attribute] = modalAttributes[attribute];
            }
            $scope.modal.show = true;
        };

    });

    return BaseCtrlModule;

});