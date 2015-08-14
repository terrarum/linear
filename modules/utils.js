var $ = require("jquery");
module.exports = {
    timestamp: function() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    },
    getCanvasContext: function() {
        return $(".js-canvas")[0].getContext("2d");
    }
};