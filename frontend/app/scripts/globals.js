"use strict";

define(function(){

    var Globals =  {
        paths : {
            home : "/#/listing/artists",
            createNewDirectory : "/api/library/directory",
            upload : "/api/library/upload"
        },
        supportedMedia : ["audio/mpeg", "audio/ogg"]

    };

    return Globals;
});