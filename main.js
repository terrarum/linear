var $ = require("jquery");
var utils = require("./modules/utils");
var game = require("./modules/game");

$(function() {

    game.init();

    var now,
        dt       = 0,
        last     = utils.timestamp(),
        slow     = 1, // slow motion scaling factor
        step     = 1/60,
        slowStep = slow * step,
        update   = game.update,
        render   = game.render,
        fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });

    function frame() {
        fpsmeter.tickStart();
        now = utils.timestamp();
        dt = dt + Math.min(1, (now - last) / 1000);
        while(dt > slowStep) {
            dt = dt - slowStep;
            update(step);
        }
        render(dt/slow);
        last = now;
        fpsmeter.tick();
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

});

/**
 velocity is a vector
    magnitude (speed) and direction are known


 Spaceship movement
 Every tick, get spaceship's movement vector
 Add vector results to current position
 Thrusting must manipulate movement vector

 thrust vector is based against a unit of time? e.g. move this far in this direction in one second
 */