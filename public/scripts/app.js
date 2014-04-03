'use strict';

var Applaudio = angular.module('applaudio', ["ngRoute", "DirectoryListing"]);

Applaudio.config(["$routeProvider",
  function($routeProvider) {

    $routeProvider.
      when('/listing/:url*', {
        templateUrl: '/views/listing.html',
        controller: 'DirectoryListingCtrl'
      }).
      otherwise({
        redirectTo: '/listing/artists'
      });
  }]);
