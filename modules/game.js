var $ = require("jquery");
var utils = require("./utils");
var grid = require("./grid");
var mouse = require("./mouse");
var $canvas = $(".js-canvas")
    ctx = utils.getCanvasContext(),

    canvasWidth = $canvas.width(),
    canvasHeight = $canvas.height();

var _init = function() {
    console.log(canvasWidth, canvasHeight);
};

var _update = function() {
    mouse.update();
};

var _render = function() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    grid.draw();
    mouse.render();
};

module.exports = {
    init: function() {
        _init();
    },
    update: function() {
        _update();
    },
    render: function() {
        _render();
    }
}