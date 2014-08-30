"use strict";

define(function(){

    var Config =  {
        paths: {
            home: "/#/listing/artists",
            api: {
                getDirectory: "/api/librarymanager",
                createDirectory: "/api/librarymanager/directory",
                upload: "/api/librarymanager/upload"
            },
        },
        supportedMedia : {
            types: ["audio/mpeg", "audio/mp3", "audio/ogg"],
            extensions: [".mpeg", ".mp3", ".ogg"]
        }

    };

    return Config;
});