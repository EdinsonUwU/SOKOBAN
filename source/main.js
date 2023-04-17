import { dfs } from "/source/dfs.js"
import { paint_new_state, repaint_the_map } from "/source/paint_new_state.js"

var matrix;
var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;

var button_run = document.getElementById("button-run").onclick=create_matrix

async function doStuff() {
    repaint_the_map(canvas, numberOfCells);
        
     try {
        //oneStepOfBehavior returns a matriz, where a movement has been made
        paint_new_state(numberOfCells, matrix);
     }
     catch {
         console.log("Juego Terminado");

     }
     //Sleep for 3 seconds
    await new Promise(r => setTimeout(r, 250));
    doStuff()
}

doStuff()


