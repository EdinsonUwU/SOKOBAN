import { dfs } from "/source/dfs.js"

var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;
var numberOfCells = 6;
var numberOfWalls = 0;

var button_run = document.getElementById("button-run").onclick=create_matrix

//the number of lines inside the canvas is: numberOfCells - 1
function repaint_the_map(canvas, numberOfCells) {
    var canvasContext = canvas.getContext("2d");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var peaceBetwenCells = canvasWidth / numberOfCells;

    //creacion de los rectangulos de color rosado palido
    for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
        for (var j = 0; j < canvasHeight; j = j + peaceBetwenCells) {
            canvasContext.fillStyle = "rgba(130, 150, 210, 0.5)";
            canvasContext.fillRect(i, j, peaceBetwenCells, peaceBetwenCells);
        }
    }

    //creacion de las lineas dentro del canvas
    for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = "#7c5bca";
        canvasContext.moveTo(i, 0);
        canvasContext.lineTo(i, canvasHeight);
        canvasContext.stroke();
    }
    for (var j = 0; j < canvasWidth; j = j + peaceBetwenCells) {
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = "#7c5bca";
        canvasContext.moveTo(0, j);
        canvasContext.lineTo(canvasWidth, j);
        canvasContext.stroke();
    }
}

repaint_the_map(canvas, numberOfCells);



function create_matrix(){
    var matriz_leida = []
    function read_matrix(){
        var textarea = document.getElementById("textarea")
        var textarea_value = textarea.value
        var rows = textarea_value.split(/\r?\n|\r|\n/g);

        return rows
    }

    var rows = read_matrix()
    for (var i = 0; i < rows[0].length; i++){
        var columns = rows[i].split('')
        matriz_leida.push(columns)

    }

    console.log(matriz_leida)

    return matriz_leida

}

var matriz = create_matrix()



//funcion que va a pintar el agente, las paredes, la meta
//agent:green; walls: black; goal:red
function paint_new_state(numberOfCelss, matriz) {
    var canvasContext = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var peaceBetwenCells = canvasWidth / numberOfCells;

    for (var i = 0; i < numberOfCelss; i++) {
        for (var j = 0; j < numberOfCelss; j++) {
            if (matriz[i][j] == "W") {
                canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
                canvasContext.fillRect(j * peaceBetwenCells, i * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
            }
            else if (matriz[i][j] == 'X') {
                canvasContext.fillStyle = "rgba(0, 200, 0, 0.5)";
                canvasContext.fillRect(j * peaceBetwenCells, i * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
            }
            else if (matriz[i][j] == 3) {
                canvasContext.fillStyle = "rgba(255, 150, 0, 0.5)";
                canvasContext.fillRect(j * peaceBetwenCells, i * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
            }
        }
    }
}


async function doStuff() {
    repaint_the_map(canvas, numberOfCells);
    console.log("a")
    
     try {
         //oneStepOfBehavior returns a matriz, where a movement has been made
        paint_new_state(numberOfCells, create_matrix());
     }
     catch {
         console.log("Juego Terminado");

     }
     //Sleep for 3 seconds
    await new Promise(r => setTimeout(r, 250));
    doStuff()
}

doStuff()


