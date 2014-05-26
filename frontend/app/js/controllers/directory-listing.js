'use strict';

define([
    "angular",
    "utils",
    "globals",
    "directives/components"
], function (angular, Utils, Globals) {

    console.log("Defining DirectoryListing module");

    var DirectoryListing = angular.module("DirectoryListing", ["ApplaudioComponents"]);

    console.log("Defining DirectoryListing controller");
    DirectoryListing.controller('DirectoryListingCtrl', function ($scope, $http, $location, UploadService) {

        var controllerScope = this;

        controllerScope.placeholderVisibility = "hidden"; // Don't show placeholder until HTTP request has completed.

        $http.get("/api/library/" + $scope.currentPath).
            success(function(data) {
                controllerScope.listing = data.listing;
                controllerScope.placeholderVisibility = "visible";
            }).
            error(function(){
                console.log("Cannot find directory in /music/...");
                controllerScope.listing = ["404"];
                // TODO: 404 (+--0)~~~[~- - ]
            });

        controllerScope.navigate = function(directoryName) {
            console.log("directoryName: " + directoryName);
            $location.path($location.path() + "/" + directoryName);
        };

        controllerScope.addDirectory = function() {

            console.log("addDirectory()");

            $scope.showModal({
                heading : "Add Directory",
                showTextInput : true,
                textInputTag : "Directory name: ",
                textInputPlaceholder : "name",
                showConfirm: true,
                confirmText: "Add",
                confirm: function() {

                    console.log("modal confirm button clicked");
                    var path = $scope.currentPath;
                    var directoryName = $scope.modal.textInput;

                    console.log("Add directory: " + path + directoryName);
                    $scope.modal.hide();
                    if(controllerScope.listing.indexOf(directoryName) !== -1) {
                        console.log("Directory already exists in current model. Scroll to element.");
                        document.querySelector("#directory_" + Utils.htmlify(directoryName)).scrollIntoView();
                        // TODO: smooth scroll. Add element highlight as well?
                    } else {
                        $http.post(Globals.paths.createNewDirectory, { "path" : path, "name" : directoryName })
                            .success(function(){
                                console.log("new directory created successfully.");
                                var directoryPosition = 0;
                                while (directoryName > controllerScope.listing[directoryPosition]) {
                                    directoryPosition++;
                                }
                                Utils.insertAt(controllerScope.listing, directoryPosition, directoryName);
                            })
                            .error(function(data, status){
                                window.alert("Error adding directory. See console");
                                console.log("Error adding directory: " + status);
                                console.log(data);
                            });
                    }
                }
            });
        };

        controllerScope.uploadMusic = function() {
            console.log("uploadMusic");

            $scope.showModal({
                heading : "Upload Music",
                showFileInput : true,
                showConfirm : true,
                confirmText : "Upload",
                confirm : function() {
                    console.log("modal confirm button clicked");

                    var uploadFiles = document.getElementById("modal-file-input").files;//$scope.modal.uploadFiles;
                    console.log(uploadFiles);

                    var formData = new FormData();
                    formData.append("path", $scope.currentPath);
                    for (var i = 0; i < uploadFiles.length; i++) {
                        console.log("appending " + uploadFiles[i].name);
                        formData.append(uploadFiles[i].name, uploadFiles[i]);
                    }

                    $scope.modal.upload.inProgress = true;
                    UploadService.upload(formData);

                }
            });
        };

    });

    return DirectoryListing;

});