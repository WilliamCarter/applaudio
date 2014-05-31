define(["angular", "globals", "services/utils"], function (angular, Globals) {

    var ApplaudioModal = angular.module("ApplaudioModal", ["ApplaudioUtilities"]);

    ApplaudioModal.service("ModalService", function() {

        // This service simply allows the modal's interface to be globally available.

        var ModalService = this;

        ModalService.bindToModal = function(attributes, show, update) {
            ModalService.attributes = attributes;
            ModalService.show = show;
            ModalService.update = update;
        };


    });

    ApplaudioModal.directive("applaudioModal", ["ModalService", "ApplaudioUtils", function(ModalService, Utils) {

        console.log("Defining applaudioModal");
        console.log(ModalService);
        console.log(Utils);

        return {
            restrict: "E",
            templateUrl: "components/modal/modal.html",
            link: function(scope, element, attrs) {

                // Modal Attributes
                var defaultModalAttributes = {
                    show : false,
                    heading : "",
                    cancel : {
                        text : "Cancel",
                    },
                    confirm : {
                        action : null,
                        text : "Ok",
                        show : false
                    },
                    textInput : {
                        show : false,
                        content : "",
                        placeholder: "",
                        tag : ""
                    },
                    upload : {
                        show : false,
                        files : [],
                        inProgress : false,
                        progress : 0
                    }
                };
                scope.modalAttributes = {}

                var resetModal = function() {
                    Utils.merge(scope.modalAttributes, defaultModalAttributes);;
                }

                // Show/hide
                scope.show = function() {
                    scope.modalAttributes.show = true;
                };
                scope.hide = function() {
                    console.log("Hide modal");
                    scope.modalAttributes.show = false;
                };

                // File Upload
                var fileInputElement = document.querySelector("#modal-file-input")

                scope.clickFileInput = function() {
                    console.log("modal.clickFileInput()");
                    fileInputElement.click();
                };

                scope.readUploadFiles = function() {
                    console.log("modal.readUploadFiles()");
                    var allFiles = fileInputElement.files;
                    console.log(allFiles);
                    var uploadFiles = [];
                    for (var i = 0; i < allFiles.length; i++) {
                        if (Globals.supportedMedia.types.indexOf(allFiles[i].type) !== -1) {
                            uploadFiles.push(allFiles[i]);
                        } else {
                            console.log(allFiles[i].name + " is of type " + allFiles[i].type + ", and not supported by applaudio.");
                        }
                    }
                    scope.$apply(function(){
                        scope.modalAttributes.upload.files = uploadFiles;
                    });
                }

                // Bind to Modal
                var updateModal = function(modalData) {
                    console.log("Update Modal");
                    Utils.merge(scope.modalAttributes, modalData);
                    console.log("Finished updating modal");
                    console.log(scope.modalAttributes);
                };

                var showModal = function(modalData) {
                    console.log("showModal");
                    if (modalData !== undefined) {
                        resetModal();
                        updateModal(modalData);
                    }

                    scope.show();
                };


                ModalService.bindToModal(scope.modalAttributes, showModal, updateModal);
            }
        };
    }]);

});