//the number of lines inside the canvas is: numberOfCells - 1
export function repaint_the_map(canvas, numberOfCells) {
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


//funcion que va a pintar el agente, las paredes, la meta
//agent:green; walls: black; goal:red
export function paint_new_state(canvas, matriz) {
    var canvasContext = canvas.getContext("2d");
    const numberOfCells = matriz.len()
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