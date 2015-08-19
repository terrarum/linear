var $ = require("jquery");
var utils = require("./utils");

var $canvas = $(".js-canvas");

var offsetX = $canvas.width() / 2;
var offsetY = $canvas.height() / 2;

var ctx = utils.getCanvasContext();

var center = {
    x: offsetX,
    y: offsetY
};

var mouse = {
    x: 0,
    y: 0
};

$(document).on("mousemove", function(ev) {
    mouse.x = ev.pageX - $canvas.offset().left;
    mouse.y = ev.pageY - $canvas.offset().top;
});

var drawItem = function(item) {

    var x = item.x;
    var y = item.y;

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#22bb22";
    ctx.strokeStyle = "#22bb22";
    ctx.fill();
    ctx.lineWidth = 0;

    ctx.stroke();
};


var polar = function(r, theta) {
    return {
        magnitude: r,
        angle: theta
    }
};

var hLength,
    vLength,
    dLength,
    p,
    midpoint,
    quartpoint,
    offsetPos,
    offsetPosP,
    offsetmidpointP,
    angle,
    arcAngleStart,
    arcCCW;

var drawMouseLines = function() {
    ctx.beginPath();

    ctx.strokeStyle = "#bbbbbb";
    ctx.font = "20px Arial";

    hLength = mouse.x - center.x;
    vLength = center.y - mouse.y;
    dLength = Math.sqrt(Math.pow(hLength, 2) + Math.pow(vLength, 2));

    // Horizontal line.
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(mouse.x, center.y);
    ctx.fillText(Math.abs(hLength), mouse.x + (center.x - mouse.x) / 2 - 10, center.y - 5);

    // Vertical line.
    ctx.moveTo(mouse.x, center.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.fillText(Math.abs(vLength), mouse.x + 5, center.y + (mouse.y - center.y) / 2);

    // Diagonal line.
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(mouse.x, mouse.y);

    p = utils.calculatePolar(hLength, vLength);
    
    midpoint = utils.calculateCartesian(p.magnitude / 2, p.angle);
    quartpoint = utils.calculateCartesian(p.magnitude / 4, p.angle);

    ctx.fillText(dLength.toFixed(2), midpoint.x + offsetX + 10, -midpoint.y + offsetY);

    ctx.moveTo(center.x, center.y);

    angle = Math.atan2(-midpoint.y, midpoint.x);

    // Top right.
    if (angle <= 0 && angle > -Math.PI / 2){
        arcAngleStart = 0;
        arcCCW = true;

        offsetPos = polar(-5, p.angle - Math.PI / 2);
    }
    // Top left.
    else if (angle <= -Math.PI / 2 && angle >= -Math.PI) {
        arcAngleStart = Math.PI;
        arcCCW = false;

        offsetPos = polar(5, p.angle - Math.PI / 2);
    }
    // Bottom right.
    else if (angle > 0 && angle < Math.PI / 2) {
        arcAngleStart = 0;
        arcCCW = false;

        offsetPos = polar(5, p.angle - Math.PI / 2);
    }
    // Bottom left.
    else {
        arcAngleStart = Math.PI;
        arcCCW = true;

        offsetPos = polar(-5, p.angle - Math.PI / 2);
    }

    offsetPosP = utils.calculateCartesian(offsetPos.magnitude, offsetPos.angle);
    offsetmidpointP = {
        x: midpoint.x + offsetPosP.x,
        y: midpoint.y + offsetPosP.y
    };

    ctx.arc(center.x, center.y, p.magnitude / 4, arcAngleStart, angle, arcCCW);

    ctx.stroke();
};

var _update = function() {

};

var _render = function() {

    // Draw center;
    drawMouseLines()
    drawItem(center);

    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(offsetPosP.x + offsetX, -offsetPosP.y + offsetY);
    ctx.lineTo(offsetmidpointP.x + offsetX, -offsetmidpointP.y + offsetY);
    ctx.stroke();

    drawItem(mouse);
};

module.exports = {
    update: function() {
        _update();
    },
    render: function() {
        _render();
    }
};