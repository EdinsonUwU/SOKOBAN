import { dfs } from "/source/dfs.js";
import { repaint_matrix, repaint_the_map } from "/source/paint_world.js";
import { create_matrix } from "/source/read_inputs.js";

var matrix = [];
var pos_boxes = [];
var pos_agent = [];
var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;

//var button_run = (document.getElementById("button-run").onclick =
//  create_matrix);

async function doStuff() {
  if (matrix.toString() === "") {
    matrix = create_matrix();
    //pos_boxes = read_pos_boxes();
    //pos_agent = read_pos_agent();
    repaint_the_map(canvas, matrix.length);
    repaint_matrix(canvas, matrix);
    //paint_new_state(canvas, pos_boxes, pos_agent);
  }else{
    repaint_the_map(canvas, matrix.length);
    repaint_matrix(canvas, matrix);
    //paint_new_state(canvas, pos_boxes, pos_agent);
  }

  console.log(matrix);
  //Sleep for 3 seconds
  await new Promise((r) => setTimeout(r, 250));
  doStuff();
}

doStuff();
