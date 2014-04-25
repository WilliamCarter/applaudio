'use strict';

define(["angular", "utils"], function (angular, Utils) {

    console.log("Defining DirectoryListing module");

    var DirectoryListing = angular.module("DirectoryListing", []);

    console.log("Defining DirectoryListing controller");
    DirectoryListing.controller('DirectoryListingCtrl', function ($scope, $routeParams, $http, $location) {

        console.log("received url: " + $routeParams.url);
        console.log($routeParams);

        var controllerScope = this;

        controllerScope.placeholderVisibility = "hidden"; // Don't show placeholder until HTTP request has completed.

        // TODO: broadcasting/emitting the event will be more robust than simply calling $parent.
        $scope.$parent.currentPath = "/" + $routeParams.url + "/";

        $http.get("/api/library/" + $routeParams.url).
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
                        $http.post("/api/library/directory", { "path" : $scope.currentPath, "name" : directoryName })
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

                    var uploadFiles = $scope.modal.uploadFiles;
                    console.log(uploadFiles);

                    var formData = new FormData();
                    formData.append("audio", uploadFiles[0]);
                    formData.append("path", $scope.currentPath);
                    for (var file in uploadFiles) {
                        formData.append(file.name, file);
                    }

                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', "/api/library/upload", true);
                    xhr.onload = function(e) {
                        console.log("upload successful");
                        console.log(e);
                    };
                    xhr.onprogress = function updateProgress(event) {
                        if (event.lengthComputable) {
                            var percentComplete = (event.loaded / event.total)*100;
                            console.log("PercentComplete: " + percentComplete);
                        } else {
                            console.log("length not computable but go the following: ");
                            console.log(event);
                        }
                    };

                    xhr.send(formData);

                 }
             });
        };


    });

    return DirectoryListing;

});