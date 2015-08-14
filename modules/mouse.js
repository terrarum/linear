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

    $(".js-mousePos").html(mouse.x + " / " + mouse.y);
});

//
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


var polar = function() {
    return {
        magnitude: 0,
        angle: 0
    }
};

var calculatePolar = function(x, y) {
    var r = Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
    var theta = Math.atan(y/x) * 360 / 2 / Math.PI;
    if (x >= 0 && y >= 0) {
        theta = theta;
    } else if (x < 0 && y >= 0) {
        theta = 180 + theta;
    } else if (x < 0 && y < 0) {
        theta = 180 + theta;
    } else if (x > 0 && y < 0) {
        theta = 360 + theta;
    }

    $(".js-angle").html(theta.toFixed(2));

    return {
        magnitude: r,
        angle: theta
    }
};

function calculateCartesian(r, theta){
    var x = r * Math.cos(theta * 2 * Math.PI / 360);
    var y = r * Math.sin(theta * 2 * Math.PI / 360);
    return {
        x: x,
        y: y
    }
}

var hLength,
    vLength,
    dLength,
    p,
    newPos;
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

    p = calculatePolar(hLength, vLength);
    p.magnitude = p.magnitude / 2;

    newPos = calculateCartesian(p.magnitude, p.angle);

    ctx.fillText(dLength.toFixed(2), newPos.x + offsetX + 10, -newPos.y + offsetY);

    ctx.stroke();
};

var _update = function() {

};

var _render = function() {

    // Draw center;
    drawMouseLines()
    drawItem(center);
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