'use strict';

define(["angular", "utils"], function (angular, Utils) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", []);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', function ($scope) {

        var controllerScope = this;

        $scope.currentPath = "/";

        // Copy the Utils function to allow views to use it.
        controllerScope.htmlify = function(string) {
//            console.log("BaseCtrl.htmlify(" + string + ")");
            return Utils.htmlify(string);
        };


        // MODALS
        var defaultModal = {
            show : false,
            heading : "",
            showTextInput : false,
            textInputTag : "",
            showFileInput : false,
            fileInputTag : "",
            cancelText : "Cancel",
            showConfirm : false,
            cancel : function(){ controllerScope.modal.show = false; },
            confirmText : "Ok",
            confirm : null
        };

        // Initial format:
        controllerScope.modal = defaultModal;

        $scope.showModal = function(modalAttributes) {
            console.log("BaseCtrl.showModal()");
            controllerScope.modal = defaultModal;
            for (var attribute in modalAttributes) {
                controllerScope.modal[attribute] = modalAttributes[attribute];
            }
            controllerScope.modal.show = true;
        };

        controllerScope.modal.readUploadFiles = function() {
            console.log("BaseCtrl.readUploadFiles()");
            controllerScope.uploadFiles = document.querySelector("#modal-file-input").files;
        };

    });

    return BaseCtrlModule;

});