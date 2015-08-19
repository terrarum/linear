var $ = require("jquery");
module.exports = {
    timestamp: function() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    },
    getCanvasContext: function() {
        return $(".js-canvas")[0].getContext("2d");
    },
    calculateCartesian: function(r, theta){
        var x = r * Math.cos(theta);
        var y = r * Math.sin(theta);
        return {
            x: x,
            y: y
        }
    },
    calculatePolar: function(x, y) {
        var r = Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
        var theta = Math.atan2(y, x);

        return {
            magnitude: r,
            angle: theta
        }
    }
};