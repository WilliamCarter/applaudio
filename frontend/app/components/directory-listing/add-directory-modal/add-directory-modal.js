define(["components/directory-listing/directory-listing"], function (DirectoryListing) {

    DirectoryListing.directive("addDirectoryModal", ["DirectoryListingService", function(DirectoryListingService) {

        return {
            restrict: 'E',
            templateUrl: "components/directory-listing/add-directory-modal/add-directory-modal.html",
            link: function(scope, element, attrs) {

                scope.confirm = function(directoryName) {
                    scope.hide();

                    if(DirectoryListingService.listing.indexOf(directoryName) !== -1) {
                        console.log("Directory already exists in current model. Scroll to element.");
                        document.querySelector("#directory_" + ApplaudioUtils.htmlify(directoryName)).scrollIntoView();
                    } else {
                        DirectoryListingService.addDirectory(directoryName);
                    }
                }
            }
        };
    }]);

});