define([
    "services/utils",
    "components/directory-listing/directory-listing"
], function (DirectoryListing) {

    DirectoryListing.directive("addDirectoryModal", [
        "DirectoryListingService",
        "ApplaudioUtils",
        "MessageBarService",
    function(DirectoryListingService, Utils, MessageBarService) {

        return {
            restrict: 'E',
            templateUrl: "components/directory-listing/add-directory-modal/add-directory-modal.html",
            link: function($scope, $element, $attrs) {

                $scope.confirm = function() {
                    console.log("confirm");
                    var directoryName = $scope.newDir;
                    $scope.hide();

                    var directoryAlreadyExists = function(file) {
                        return file.label === directoryName;
                    }

                    if(Utils.contains(DirectoryListingService.listing, directoryAlreadyExists)) {
                        MessageBarService.addMessage("The directory '" + directoryName + "' already exists");
                        var existingId = "#directory_" + Utils.htmlify(directoryName);
                        document.querySelector(existingId).scrollIntoView();
                    } else {
                        DirectoryListingService.addDirectory(directoryName);
                    }
                }
            }
        };
    }]);

});