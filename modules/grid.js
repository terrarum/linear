var $ = require("jquery");
var utils = require("./utils");
var $canvas = $(".js-canvas")
ctx = utils.getCanvasContext(),

    canvasWidth = $canvas.width(),
    canvasHeight = $canvas.height();

var space = 20,
    i,
    thickSpace = 100;

var _draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 1;
    for (i = space; i < canvasWidth; i += space) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);
    }
    for (i = space; i < canvasHeight; i += space) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvasWidth, i);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = thickSpace; i < canvasWidth; i += thickSpace) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);
    }
    for (i = thickSpace; i < canvasHeight; i += thickSpace) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvasWidth, i);
    }
    ctx.stroke();
};

module.exports = {
    draw: function() {
        _draw();
    }
};