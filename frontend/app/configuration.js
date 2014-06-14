"use strict";

define(function(){

    var Config =  {
        paths : {
            home : "/#/listing/artists",
            createNewDirectory : "/api/library/directory",
            upload : "/api/library/upload"
        },
        supportedMedia : {
            types: ["audio/mpeg", "audio/mp3", "audio/ogg"],
            extensions: [".mpeg", ".mp3", ".ogg"]
        }

    };

    return Config;
});