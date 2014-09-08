define(["components/directory-listing/directory-listing", "angularMocks"], function() {

    describe("The Directory Listing Controller", function() {

        var controller, scope, mockDirectoryListingService;

        var initialiseController = function() {
            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                controller = $controller('DirectoryListingCtrl', {
                    DirectoryListingService: mockDirectoryListingService,
                    configuration: {
                        paths: {
                            api: {
                                downloads: "/api/downloads"
                            }
                        }
                    },
                    $scope: scope
                });
            });
        }

        beforeEach(function() {

            module("DirectoryListing");

            mockDirectoryListingService = {
                listing: [],
                currentPath: function() {},
                loadContent: function() {}
            };

        });


        it("should build the directory download path correctly", function() {
            spyOn(mockDirectoryListingService, 'currentPath').and.returnValue('/artists/The Prodigy');
            initialiseController();
            expect(controller.downloadAllUrl).toBe("/api/downloads/artists/The Prodigy");
        });

        it("should load the directory content on page load", function() {
            spyOn(mockDirectoryListingService, 'loadContent');
            initialiseController();
            expect(mockDirectoryListingService.loadContent).toHaveBeenCalled();
        });

        it("should watch for changes in the model", function() {
            initialiseController();
            mockDirectoryListingService.listing.push({ type: "directory", label: "Steve Reich" });
            scope.$digest();
            expect(controller.listing.length).toBe(1);
        });

        describe("Ordering with the 'listingOrder' filter", function() {

            beforeEach(initialiseController);

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
