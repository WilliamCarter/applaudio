'use strict';

define(["angular"], function(angular){

    console.log("Defining ApplaudioUtilities");

    var ApplaudioUtilities = angular.module("ApplaudioUtilities", []);

    ApplaudioUtilities.factory("ApplaudioUtils", function() {

        var insertAt = function(array, index, item) {
            array.splice(index, 0, item);
        };

        var forEach = function(iterableObject, functionToPerform) {
            // Iterates over both arrays and javascript objects.
            if (Array.isArray(iterableObject)) {
                for (var i = 0; i < iterableObject.length; i++) {
                    functionToPerform(iterableObject[i]);
                }

            } else {
                for (var key in iterableObject) {
                    functionToPerform(iterableObject[key]);
                }
            }
        };

        var clone = function(object){
            // function to copy an object's variables EXCEPT FOR FUNCTIONS.
            // (assignment simply passes a reference of the object which can be altered by other objects holding the same reference).
            return JSON.parse(JSON.stringify(object));
        }

        var merge = function(original, updates) {
            // Recursively copy an object's attributes on to another.

            for(var key in updates) {
                if (typeof updates[key] === "object") {
                    original[key] =  {};
                    merge(original[key], updates[key]);
                } else if (typeof updates[key] === "function") {
//                    original.prototype["key"] = updates.prototype[key];
                } else {
                    original[key] = updates[key];
                }
            }
        };

        var htmlify = function(string) {
            // e.g. replace "Katrina and the Waves" with "katrina-and-the-waves"
            return string.trim().replace(/ /g, "-").toLowerCase();
        };

        return {
            insertAt : insertAt,
            forEach : forEach,
            clone : clone,
            merge : merge,
            htmlify : htmlify
        }

    });

    return ApplaudioUtilities;

});