define([
    "components/directory-listing/directory-listing",
    "configuration",
    "services/upload"
], function (DirectoryListing, Config) {

    DirectoryListing.directive("uploadModal", [
        "DirectoryListingService",
        "UploadService",
        "$interval",
    function(DirectoryListingService, UploadService, $interval) {

        return {
            restrict: 'E',
            templateUrl: "components/directory-listing/upload-modal/upload-modal.html",
            link: function(scope, element, attrs) {

                scope.files = [];
                scope.uploadProgress = 0;

                var fileInputElement = document.querySelector("#modal-file-input");

                scope.clickFileInput = function() {
                    console.log("modal.clickFileInput()");
                    fileInputElement.click();
                };

                scope.readUploadFiles = function() {
                    console.log("readUploadFiles()");
                    var allFiles = fileInputElement.files;
                    console.log(allFiles);

                    // Filter out unsupported files
                    for (var i = 0; i < allFiles.length; i++) {
                        if (Config.supportedMedia.types.indexOf(allFiles[i].type) !== -1) {
                            scope.files.push(allFiles[i]);
                        } else {
                            console.log(allFiles[i].name + " is of type " + allFiles[i].type + ", and not supported by applaudio.");
                        }
                    }

                    scope.$apply();
                }

                scope.confirm = function() {
                    scope.uploadInProgress = true;
                    UploadService.upload(DirectoryListingService.currentPath(), scope.files);
                };


                UploadService.subscribeForProgressUpdates(function(updateEvent) {

                    if (updateEvent.type === "progress") {

                        scope.$apply(function() {
                            scope.uploadProgress = updateEvent.progress;
                        });

                    } else if (updateEvent.type === "complete" && updateEvent.success) {

                        // wait half a second to allow load animation to finish and let user know upload was successful
                        // TODO: Is this wait behaviour beneficial to the user or does it just steal time from them? Maybe replace with some sort of notification system.
                        $interval(function() {
                            scope.hide();
                            DirectoryListingService.loadContent();
                        }, 500, 1);

                    } else {
                        console.warn("Upload error");
                        console.log(updateEvent);
                    }
                });

            }
        };
    }]);

});