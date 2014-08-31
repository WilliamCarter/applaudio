'use strict';

define([
    "components/directory-listing/directory-listing",
    "configuration",
    "services/utils"
], function (DirectoryListing, Config) {

    DirectoryListing.directive("applaudioListingItem", [
        "ApplaudioUtils",
        "DirectoryListingService",
        "$http",
    function(Utils, DirectoryListingService, $http) {

        return {
            restrict: 'E',
            templateUrl: "components/directory-listing/listing-item/listing-item.html",
            scope: {
                item: "="
            },
            link: function(scope, element, attrs) {

                scope.itemId = scope.item.type + "_" + Utils.htmlify(scope.item.label);
                scope.iconSrc = "/images/" + (scope.item.type === "file" ? "music" : "folder") + ".png";

                scope.navigate = function() {
                    // Expose navigation if this is a directory
                    if (scope.item.type === "directory") {
                        DirectoryListingService.navigate(scope.item.label)
                    }
                };

                scope.download = function() {
                    // Allow download if this is a music file
                    console.log("download() - " + scope.item.label)
                };

            }
        };

    }]);

});
