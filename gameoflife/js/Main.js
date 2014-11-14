/*
 * Create new game instance and start the game when the website is loaded.
 */
$(document).ready(function() {
    canHeight = $(window).get(0).innerHeight;
    canWidth = $(window).get(0).innerWidth;
    canWidth = canWidth < 900? 900: canWidth;
    $("canvas").attr("width", canWidth);
    $("canvas").attr("height", canHeight);
    game = new Game();
    game.init();
});
