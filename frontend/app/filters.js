'use strict';

define(["angular", "configuration"], function (angular, Config) {

    var filters = angular.module('applaudioFilters', []);

    filters.filter('checkmark', function() {
        return function(inputBoolean) {
            console.log("checkmark");
            return inputBoolean ? '\u2713' : '\u2718';
        };
    });

    filters.filter('htmlify', function() {
        return function(inputString) {
            // e.g. replace "Katrina and the Waves" with "katrina-and-the-waves"
            return inputString.trim().replace(/ /g, "-").toLowerCase();
        };
    });

    filters.filter('removeExtension', function() {
        return function(inputString) {
            // e.g. replace "Los.mp3" with "Los"
            for (var i = 0; i < Config.supportedMedia.extensions.length; i++) {
                var suffix = Config.supportedMedia.extensions[i];
                var suffixStartIndex = inputString.length - suffix.length;
                if (inputString.indexOf(suffix, suffixStartIndex) !== -1) {
                    return inputString.substring(0, suffixStartIndex);
                }
            }
            // No matches
            return inputString;
        };
    });

});
