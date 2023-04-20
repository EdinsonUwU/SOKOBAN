import { dfs } from "/source/dfs.js";
import { repaint_matrix, repaint_the_map, paint_new_state } from "/source/paint_world.js";
import { create_matrix, read_pos_agent, read_pos_boxes } from "/source/read_inputs.js";

var matrix = [];
var pos_boxes = [];
var pos_agent = [];
var state = [pos_boxes, pos_agent]
var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;

//var button_run = (document.getElementById("button-run").onclick =
//  create_matrix);

//dfs(canvas, matrix, state)

async function doStuff() {
  if (matrix.toString() === "") {//leer todo
    matrix = create_matrix();
    console.log(matrix)
    pos_boxes = read_pos_boxes();
    pos_agent = read_pos_agent();
    state = [pos_boxes, pos_agent]
    //repaint_the_map(canvas, matrix.length);// llamar esta funcion desde el dfs
    //repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
    //paint_new_state(canvas, pos_boxes, pos_agent); // llamar esta funcion desde el dfs
    //Sleep for 3 seconds
    await new Promise((r) => setTimeout(r, 250));
    doStuff();
  } else {
    console.log("a")
    
    var result = await dfs(canvas, matrix, state)// procesar y pintar
    return result
  }

  // //Sleep for 3 seconds
  // await new Promise((r) => setTimeout(r, 250));
  // doStuff();
}

doStuff();
