import { addNewCoord, two_opt, nearest_neighbor } from './tsp.js';

function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: .5 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10,
        y: .5 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10
    };
}

function drawGrid(context) {
    for (var x = 0; x < 1000; x += 10) {
      context.moveTo(x, 0);
      context.lineTo(x, 1000);
    }
    
    for (var y = 0.5; y < 1000; y += 10) {
      context.moveTo(0, y);
      context.lineTo(1000, y);
    }
    
    context.strokeStyle = "#000000";
    context.stroke();
}

function fillSquare(context, x, y){
    context.fillStyle = "gray"
    context.fillRect(x,y,9,9);
}

function unFillSquare(context, x, y){
    context.clearRect(x,y,9,9)
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

drawGrid(context);

canvas.addEventListener('click', function(evt) {
    var mousePos = getSquare(canvas, evt);
    var rect = canvas.getBoundingClientRect();
    var alreadyClicked = addNewCoord(
        Math.floor((1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10)/10), 
        Math.floor((1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10)/10),
    )
    if (alreadyClicked) {
        unFillSquare(context, mousePos.x, mousePos.y)
    } else {
        fillSquare(context, mousePos.x, mousePos.y)
    }
}, false);

document.getElementById('path').addEventListener('click', two_opt);
document.getElementById('clear').addEventListener('click', window.location.reload.bind(window.location));

