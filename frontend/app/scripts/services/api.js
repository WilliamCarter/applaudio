'use strict';

Applaudio.factory('Listing', ['$resource',
    function($resource){
        return $resource('/api/listing/:url*', {}, {
            get: {method:'GET'}
        });
    }]);
