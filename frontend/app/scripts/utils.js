'use strict';

define(function(){

    return {

        insertAt : function(array, index, item) {
            array.splice(index, 0, item);
        },

        htmlify : function(string) {
            // e.g. replace "Katrina and the Waves" with "Katrina-and-the-waves"
            return string.trim().replace(/ /g, "-").toLowerCase();
        }

    };

});