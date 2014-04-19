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

        controllerScope.addDirectory = function(directoryName) {
            console.log("addDirectory(" + directoryName + ")");
            controllerScope.hideModal();
            if(controllerScope.listing.indexOf(directoryName) !== -1) {
                console.log("Directory already exists in current model. Scroll to element.");
                document.querySelector("#directory_" + Utils.htmlify(directoryName)).scrollIntoView();
                // TODO: smooth scroll. Add element highlight as well?
            } else {
                $http.post("/api/library/directory", { "path" : $scope.$parent.currentPath, "name" : directoryName })
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
        };

        controllerScope.uploadMusic = function() {
            console.log("uploadMusic");
            $scope.showModal({
                 heading : "Upload",
                 showFileInput : true,
                 fileInputTag : "Choose File: ",
                 showConfirm : true,
                 confirmText : "Upload",
                 confirm : function() {
                    console.log("music uploaded.");
                    console.log($scope);
                    console.log(document.querySelector("#modal-file-input"));
                    console.log(document.querySelector("#modal-file-input").data);
                    console.log(document.querySelector("#modal-file-input").files[0]);

                 }
             });
        };

//        controllerScope.modals = {
//            MODAL_ADD_DIRECTORY : false
//        };
//
//        controllerScope.showModal = function(modalId) {
//            console.log("DirectoryListingCtrl - showModal(" + modalId + ")");
//            controllerScope.modals[modalId] = true;
//        };
//
//        controllerScope.hideModal = function() {
//            console.log("DirectoryListingCtrl - hideModal()");
//            for (var modalId in controllerScope.modals) {
//                controllerScope.modals[modalId] = false;
//            }
//        };

    });

    return DirectoryListing;

});