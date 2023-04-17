import { dfs } from "/source/dfs.js";
import { paint_new_state, repaint_the_map } from "/source/paint_world.js";
import { create_matrix } from "/source/read_inputs.js";

var matrix = [];
var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;

//var button_run = (document.getElementById("button-run").onclick =
//  create_matrix);

async function doStuff() {
  if (matrix.toString() === "") {
    matrix = create_matrix();
  }
  repaint_the_map(canvas, matrix.length);
  paint_new_state(canvas, matrix);
  console.log(matrix);
  //Sleep for 3 seconds
  await new Promise((r) => setTimeout(r, 250));
  doStuff();
}

doStuff();
