'use strict'

angular.module('applaudio').controller('404Ctrl', function () {

    console.log("404!");

    require([
        "js/lib/phaser",		// AMD Module - Phaser Library
        "js/sprites/justin",	// AMD Module - Phaser Sprite, dependency on Phaser
        "404/js/rgc"		// Non-AMD module, no dependencies
    ], function(Phaser, Justin) {

        // TODO: Phaser is totally unnecessary. Rip out or replace with proper game.

        var game, justin;

        game = new Phaser.Game(800, 400, Phaser.AUTO, 'justin', { preload : preload, create : create, update : update });

        function preload() {
            game.load.image('background', 'assets/images/background.png');
            game.load.image('justin', 'assets/images/justin-head-7.png')
        }

        function create() {
            var background = new Phaser.Sprite(game, 0, 0, 'background');
            game.world.addAt(background, 0);

            justin = new Justin(game);

            // Show home link now that the game has loaded.
            document.getElementById("home-link").style.visibility = "visible";
        }

        function update() {
            justin.angle += 4;
        }

    });

});
