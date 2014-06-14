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

    ApplaudioModal.directive("applaudioModal", ["ModalService", "UploadService", "ApplaudioUtils", function(ModalService, UploadService, Utils) {

        console.log("Defining applaudioModal");

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
                        action : null, // callback for when the confirm button is clicked.
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
                    },
                    onDismiss : null // callback for when modal has fulfilled its purpose.
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
                            UploadService.prepareFile(allFiles[i]);
                        } else {
                            console.log(allFiles[i].name + " is of type " + allFiles[i].type + ", and not supported by applaudio.");
                        }
                    }

                    updateModal({
                        upload : {
                            files : uploadFiles,
                            inProgress : false
                        }
                    });

                    scope.$apply();
                }

                UploadService.subscribeForProgressUpdates(function(updateEvent) {
                    console.log("Modal - progress update from UploadService");
                    console.log(updateEvent);

                    if (updateEvent.type === "progress") {

                        scope.$apply(function() {
                            scope.modalAttributes.upload.progress = updateEvent.progress;
                        });

                    } else if (updateEvent.type === "complete" && updateEvent.success) {
                        scope.hide();
                        if (scope.modalAttributes.onDismiss !== undefined && typeof scope.modalAttributes.onDismiss === "function") {
                            // May receive complete events more than once, at which point onDismiss will be null.
                            console.log(scope.modalAttributes.onDismiss);
                            scope.modalAttributes.onDismiss();
                        }
                    } else {
                        console.warn("Upload error");
                        console.log(updateEvent);
                        updateModal({
                            heading : "Upload Error",
                            text : "There was an error uploading the files.",
                            cancel : {
                                text : "OK",
                            },
                            confirm : {
                                show : false
                            },
                            textInput : {
                                show : false,
                            },
                            upload : {
                                show : false,
                            }
                        });
                    }
                });

                // Bind to Modal
                var updateModal = function(modalData) {
                    console.log("Update Modal");
                    Utils.merge(scope.modalAttributes, modalData);
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