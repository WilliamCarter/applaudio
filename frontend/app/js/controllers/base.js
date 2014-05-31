'use strict';

define(["angular", "globals"], function (angular, Globals) {

    var BaseCtrlModule = angular.module("BaseCtrlModule", ["ApplaudioUtilities"]);

    console.log("Defining Base controller");
    BaseCtrlModule.controller('BaseCtrl', ["$scope", "$routeParams", "ApplaudioUtils", function ($scope, $routeParams, Utils) {

        var base = this; // private variables are attached to 'base', public to '$scope'

        // currentPath is set by the URL path.
        console.log("base controller - received url: " + $routeParams.url);
        $scope.currentPath = "/" + $routeParams.url + "/";
        base.currentPathElements = $scope.currentPath.split("/").slice(1, $scope.currentPath.length-1);

        base.supportedMedia = Globals.supportedMedia;

        console.log("Defining utility functions...");

        // UTILITY FUNCTIONS //
        $scope.htmlify = function(string) {
        // Copy the Utils function to allow views to use it.
            console.log("HTMLify");
            return Utils.htmlify(string);
        };


        // NAVIGATION //
        base.linkBackToDepth = function(index) {
            return "/#/listing/" + base.currentPathElements.slice(0, index+1).join("/");
        };


        // MODALS //
//        var defaultModal = {
//            show : false,
//            heading : "",
//            showTextInput : false,
//            textInputTag : "",
//            textInputPlaceholder : "",
//            showFileInput : false,
//            fileInputTag : "",
//            clickFileInput : function() {
//                console.log("modal.clickFileInput()");
//                document.querySelector("#modal-file-input").click();
//            },
//            upload : {
//                readFiles : function() {
//                    console.log("modal.readUploadFiles()");
//                    var allFiles = document.querySelector("#modal-file-input").files;
//                    console.log(allFiles);
//                    var uploadFiles = [];
//                    for (var i = 0; i < allFiles.length; i++) {
//                        if (Globals.supportedMedia.types.indexOf(allFiles[i].type) !== -1) {
//                            uploadFiles.push(allFiles[i]);
//                        } else {
//                            console.log(allFiles[i].name + " is of type " + allFiles[i].type + ", and not supported by applaudio.");
//                        }
//                    }
//                    $scope.$apply(function(){
//                        $scope.modal.upload.files = uploadFiles;
//                    });
//                },
//                files : [],
//                inProgress : false,
//                progress: 0
//            },
//            cancelText : "Cancel",
//            showConfirm : false,
//            hide : function() { $scope.modal.show = false; },
//            confirmText : "Ok",
//            confirm : null
//        };
//        $scope.modal = defaultModal;
//
//        $scope.showModal = function(modalAttributes) {
//            console.log("BaseCtrl.showModal()");
//            $scope.modal = angular.copy(defaultModal);
//            for (var attribute in modalAttributes) {
//                $scope.modal[attribute] = modalAttributes[attribute];
//            }
//            $scope.modal.show = true;
//        };

    }]);

    return BaseCtrlModule;

});