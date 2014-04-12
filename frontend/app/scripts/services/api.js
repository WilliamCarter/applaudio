'use strict';

define(function(){

    var API = angular.module("API", []);

    API.factory('Listing', ['$resource',
        function($resource){
            return $resource('/api/listing/:url*', {}, {
                get: {method:'GET'}
            });
        }
    ]);

    return API;
});


