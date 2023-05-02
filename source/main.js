import { dfs } from "/source/dfs.js";
import { bfs } from "/source/bfs.js";
import { dfsi } from "/source/dfsi.js";
import { create_matrix, read_pos_agent, read_pos_boxes } from "/source/read_inputs.js";

var matrix = [];
var pos_boxes = [];
var pos_agent = [];
var state = [pos_boxes, pos_agent]

var canvas = document.getElementById("canvas");
var userInput = document.getElementById("textarea")
canvas.width = 480;
canvas.height = 480;

var reload_button = document.getElementById("button-reload")
var dfs_button = document.getElementById("button-dfs")
var bfs_button = document.getElementById("button-bfs")
var dfsi_button = document.getElementById("button-dfsi")

var dfs_on_progress = false
var bfs_on_progress = false
var dfsi_on_progress = false

reload_button.addEventListener("click", () => { document.location.reload() })
dfs_button.addEventListener("click", () => { dfs_on_progress = true; console.log(dfs_on_progress); console.log(dfs_on_progress || bfs_on_progress || bfsi_on_progress) })
bfs_button.addEventListener("click", () => { bfs_on_progress = true })
dfsi_button.addEventListener("click", () => { dfsi_on_progress = true })

/**
 * La funcion awaitInput se usa para saber cuando el usuario pega lo que quieres
 * correr.
 * 
 * @returns 
 */
async function awaitInput() {
  if (userInput.value === "") {//Usuario no ha ingresado nada
  }
  else if (dfs_on_progress || bfs_on_progress || dfsi_on_progress) {//Usuario presiono un boton
    matrix = create_matrix();
    pos_boxes = read_pos_boxes();
    pos_agent = read_pos_agent();

    var initial_pos = {
      operator: "",
      state: {
        boxes_position: pos_boxes,
        agent_position: {
          row: pos_agent[0],
          column: pos_agent[1]
        }
      }
    }

    let result;
    if(dfs_on_progress) result = await dfs(canvas, matrix, initial_pos)// procesar y pintar
    else if(bfs_on_progress) result = await bfs(canvas, matrix, initial_pos)// procesar y pintar
    else if(dfsi_on_progress) result = await dfsi(canvas, matrix, initial_pos)// procesar y pintar
    //await track_result(result)
    dfs_button.disable = true
    bfs_button.disable = true
    bfsi_button.disable = true
    return
  }
    await new Promise((r) => setTimeout(r, 1));
    awaitInput();
  }

  awaitInput();
