define([
    "services/utils",
    "components/directory-listing/directory-listing"
], function (DirectoryListing) {

    DirectoryListing.directive("addDirectoryModal", [
        "DirectoryListingService",
        "ApplaudioUtils",
    function(DirectoryListingService, ApplaudioUtils) {

        return {
            restrict: 'E',
            templateUrl: "components/directory-listing/add-directory-modal/add-directory-modal.html",
            link: function(scope, element, attrs) {

                scope.confirm = function(directoryName) {
                    scope.hide();

                    if(DirectoryListingService.listing.indexOf(directoryName) !== -1) {
                        var existingId = "#directory_" + ApplaudioUtils.htmlify(directoryName);
                        console.log("Directory already exists in current model. Scroll to element: " + existingId);
                        document.querySelector(existingId).scrollIntoView();
                    } else {
                        DirectoryListingService.addDirectory(directoryName);
                    }
                }
            }
        };
    }]);

});