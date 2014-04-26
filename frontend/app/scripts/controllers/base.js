'use strict';

define(["angular", "utils", "globals"], function (angular, Utils, Globals) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", []);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', function ($scope) {

        var base = this; // private variables are attached to 'base', public to '$scope'

        // currentPath is set by the URL path.
        base.currentPath = "/";
        $scope.setCurrentPath = function(path) {
            base.currentPath = path;
        };
        $scope.getCurrentPath = function() {
            return base.currentPath;
        };

        base.supportedMedia = Globals.supportedMedia;


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
                var allFiles = document.querySelector("#modal-file-input").files;
                var uploadFiles = [];
                for (var i = 0; i < allFiles.length; i++) {
                    if (Globals.supportedMedia.indexOf(allFiles[i].type) !== -1) {
                        uploadFiles.push(allFiles[i]);
                    } else {
                        console.log(allFiles[i].name + " is of type " + allFiles[i].type + ", and not supported by applaudio.");
                    }
                }
                $scope.$apply(function(){
                    $scope.modal.uploadFiles = uploadFiles;
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