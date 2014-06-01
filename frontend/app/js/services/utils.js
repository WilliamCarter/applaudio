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
        };

        var areEqual = function(first, second) {
            // Recursively check the 'first' object matches the 'second', not accounting for functions, which cannot be compared reliably.

            // Start with true;
            var equality = true;

            var areEqualIteration = function(some, other) {
                // compare types
                if (typeof some !== typeof other) {
                    equality = false;
                }
                // compare equality if primitives
                if (typeof some === "string" || typeof some === "number" || typeof some === "boolean") {
                    if (some !== other) {
                        equality = false;
                    }
                }
//                // simply compare names if functions
//                if (typeof some === "function") {
//                    if (some.name !== other.name) {
//                        return false;
//                    }
//                }
//
                if (typeof some === "object") {

                    // TODO: can optimise this by tracking keys.

                    // some is is a subset of other
                    for (var key in some) {
                        areEqualIteration(some[key], other[key]);
                    }
                    // other is a subset of some
                    for (var key in other) {
                        areEqualIteration(some[key], other[key]);
                    }
                }
//
//                if (typeof some == "array") {
//
//                    if (some.length !== other.length) {
//                        return false;
//                    }
//
//                    for(var i = 0; i < some.length; i++) {
//                        areEqualIteration(some[i], other[i]);
//                    }
//                }


            }

            areEqualIteration(first, second);

            return equality;
        };

        var merge = function(original, updates) {
            // Recursively copy an object's attributes on to another.

            for(var key in updates) {
                if (typeof updates[key] === "object" && !Array.isArray(updates[key])) {
                    original[key] =  original[key] || {};
                    merge(original[key], updates[key]);
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
            areEqual : areEqual,
            clone : clone,
            merge : merge,
            htmlify : htmlify
        }

    });

    return ApplaudioUtilities;

});