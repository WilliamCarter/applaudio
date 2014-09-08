'use strict';

define([
    "components/directory-listing/directory-listing",
    "services/utils"
], function (DirectoryListing) {

    DirectoryListing.directive("applaudioListingItem", [
        "ApplaudioUtils",
        "DirectoryListingService",
        "$http",
        "configuration",
    function(Utils, DirectoryListingService, $http, configuration) {

        return {
            restrict: 'E',
            templateUrl: "components/directory-listing/listing-item/listing-item.html",
            scope: {
                item: "="
            },
            link: function(scope, element, attrs) {

                scope.itemId = scope.item.type + "_" + Utils.htmlify(scope.item.label);
                scope.iconSrc = "/images/" + (scope.item.type === "file" ? "music" : "folder") + ".png";
                scope.showDownloadLink = scope.item.type === "file";

                scope.navigate = function() {
                    // Expose navigation if this is a directory
                    if (scope.item.type === "directory") {
                        DirectoryListingService.navigate(scope.item.label);
                    }
                };

            }
        };

    }]);

});
