import { addNewCoord, two_opt, nearest_neighbor } from './tsp.js';

window.onload = function() {
    var body = document.getElementsByTagName("body")[0];

    var table = document.createElement('TABLE');
    table.id = "myTable";

    var tblB = document.createElement('TBODY');
    table.appendChild(tblB);

    // change size of table here
    for (var i = 0; i <20; i++){
        var tr = document.createElement('TR');
        tblB.appendChild(tr);

        for (var j = 0; j<70; j++) {
            var td = document.createElement('TD');
            tr.appendChild(td);
            // td.addEventListener('click', function() {
            //     td.style.backgroundColor = "#000"; 
            // }, false);
        }
    }
    body.appendChild(table);

    table.addEventListener('click', function(evt) {
        if (evt.target.tagName === 'TD') {
            // change color of button clicked here
            if (evt.target.style.backgroundColor === "black") {
                evt.target.style.backgroundColor = "white";
                // gets index automatically
                addNewCoord(evt.target.cellIndex, evt.target.parentNode.rowIndex);
            } else {
                evt.target.style.backgroundColor = "black";  
                console.log("row: " + evt.target.parentNode.rowIndex + " column: " + evt.target.cellIndex)
                addNewCoord(evt.target.cellIndex, evt.target.parentNode.rowIndex);
            } 
            
        }
    })

    document.getElementById('myCanvas').style.height = table.offsetHeight + "px"; 
    document.getElementById('myCanvas').style.width = table.offsetWidth + "px"; 

    function resize(){
        document.getElementById('myCanvas').style.height = table.offsetHeight + "px"; 
        document.getElementById('myCanvas').style.width = table.offsetWidth + "px"; 
      }

    window.addEventListener("resize", resize, false);

    document.getElementById('path').addEventListener('click', two_opt);
}
