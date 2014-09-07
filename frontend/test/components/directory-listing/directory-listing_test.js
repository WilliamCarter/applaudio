define(["components/directory-listing/directory-listing", "angularMocks"], function() {

    describe("The Directory Listing Controller", function() {

        var controller, scope, mockDirectoryListingService;

        beforeEach(function() {

            module("DirectoryListing");

            mockDirectoryListingService = {
                listing: [],
                currentPath: function() {},
                loadContent: function() {}
            };

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                controller = $controller('DirectoryListingCtrl', {
                    $scope: scope,
                    DirectoryListingService: mockDirectoryListingService
                });

            });

        });

        it("should watch for changes in the model", function() {
            mockDirectoryListingService.listing.push({ type: "directory", label: "Steve Reich" });
            scope.$digest();
            expect(controller.listing.length).toBe(1);
        });

        describe("Ordering with the 'listingOrder' filter", function() {

            it("should truncate the filter value for subdirectories in the artists directory", function() {
                spyOn(mockDirectoryListingService, 'currentPath').and.returnValue('/artists');
                var the5678s = { type: "directory", label: "The 5, 6, 7, 8s" };
                expect(scope.listingOrder(the5678s)).toBe("A5, 6, 7, 8s");
            });

            it("should not truncate the filter value for subdirectories outside of the artists directory", function() {
                spyOn(mockDirectoryListingService, 'currentPath').and.returnValue('/artists/Fugees');
                var theScore = { type: "directory", label: "The Score" };
                expect(scope.listingOrder(theScore)).toBe("Athe score");
            });

            it("should return a lower priority filter value for non-directories", function() {
                spyOn(mockDirectoryListingService, 'currentPath').and.returnValue('/artists/The Pixies');
                var theHappening = { type: "track", label: "The Happening" };
                expect(scope.listingOrder(theHappening)).toBe("Bthe happening");
            });
        });

    });

});
