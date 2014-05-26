'use strict';

define(function(){

    return {

        insertAt : function(array, index, item) {
            array.splice(index, 0, item);
        },

        forEach : function(iterableObject, functionToPerform) {
            if (Array.isArray(iterableObject)) {
                for (var i = 0; i < iterableObject.length; i++) {
                    functionToPerform(iterableObject[i]);
                }

            } else {
                for (var key in iterableObject) {
                    functionToPerform(iterableObject[key]);
                }
            }
        },

        htmlify : function(string) {
            // e.g. replace "Katrina and the Waves" with "katrina-and-the-waves"
            return string.trim().replace(/ /g, "-").toLowerCase();
        }

    };

});