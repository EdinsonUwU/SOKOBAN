//the number of lines inside the canvas is: numberOfCells - 1
//funcion que va a volver a dejar listo el canvas para volver
//a pintar otro nuevo estado
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

  //creacion de las lineas dentro del canvas - verticales
  for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
    canvasContext.lineWidth = 4;
    canvasContext.strokeStyle = "#7c5bca";
    canvasContext.moveTo(i, 0);
    canvasContext.lineTo(i, canvasHeight);
    canvasContext.stroke();
  }
  //creacion de las lineas dentro del canvas - horizontales
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
export function repaint_matrix(canvas, matriz) {
  var numberOfCells = matriz.length;
  var canvasContext = canvas.getContext("2d");
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var peaceBetwenCells = canvasWidth / numberOfCells;

  for (var i = 0; i < numberOfCells; i++) {
    for (var j = 0; j < numberOfCells; j++) {
      if (matriz[i][j] == "W") {
        canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
        canvasContext.fillRect(
          j * peaceBetwenCells,
          i * peaceBetwenCells,
          peaceBetwenCells,
          peaceBetwenCells
        );
      } else if (matriz[i][j] == "X") {
        canvasContext.fillStyle = "rgba(0, 200, 0, 0.5)";
        canvasContext.fillRect(
          j * peaceBetwenCells,
          i * peaceBetwenCells,
          peaceBetwenCells,
          peaceBetwenCells
        );
      }
    }
  }
}

export function paint_new_state(canvas, matrix, state){
  var pos_boxes = state[0];
  var pos_agent = state[1];
  var numberOfCells = matrix.length;
  var canvasContext = canvas.getContext("2d");
  var canvasWidth = canvas.width;
  var peaceBetwenCells = canvasWidth / numberOfCells;

  //paint boxes
  for (var i = 0; i < pos_boxes.length; i++) {
    canvasContext.fillStyle = "rgba(255, 255, 0, 0.5)";
    canvasContext.fillRect(
      pos_boxes[i][1] * peaceBetwenCells,
      pos_boxes[i][0] * peaceBetwenCells,
      peaceBetwenCells,
      peaceBetwenCells
    );
  }

  //paint agent
  canvasContext.fillStyle = "rgba(255, 0, 0, 0.5)";
  canvasContext.fillRect(
    pos_agent[1] * peaceBetwenCells,
    pos_agent[0] * peaceBetwenCells,
    peaceBetwenCells,
    peaceBetwenCells
  );
}