//funcion que va a pintar el agente, las paredes, la meta
//agent:green; walls: black; goal:red
/**
 * La funcion repaint_matrix pinta las paredes W, las posiciones meta X, y las posiciones en donde es posible moverse.
 * Esta funcion usa una referncia canvas a un objeto canvas en index.html
 * @param {html} canvas 
 * @param {Array} matrix 
 */
export function repaint_matrix(canvas, matrix) {
  var numberOfCells = Math.max(matrix[0].length, matrix.length);
  var canvasContext = canvas.getContext("2d");
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var peaceBetwenCells = canvasWidth / numberOfCells;

  for (var i = 0; i < numberOfCells; i++) {
    for (var j = 0; j < numberOfCells; j++) {
      try{
        if (matrix[i][j] == "W") {
          canvasContext.fillStyle = "rgba(0, 0, 0)";
          canvasContext.fillRect(
            j * peaceBetwenCells,
            i * peaceBetwenCells,
            peaceBetwenCells,
            peaceBetwenCells
          );
        } else if (matrix[i][j] == "X") {
          canvasContext.fillStyle = "rgba(0, 250, 0)";
          canvasContext.fillRect(
            j * peaceBetwenCells,
            i * peaceBetwenCells,
            peaceBetwenCells,
            peaceBetwenCells
          );
        } else {
          canvasContext.fillStyle = "rgba(130, 150, 210)";
          canvasContext.fillRect(j * peaceBetwenCells, i * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
        }
      }catch{
        canvasContext.fillStyle = "rgba(50, 50, 50)";
        canvasContext.fillRect(j * peaceBetwenCells, i * peaceBetwenCells, peaceBetwenCells, peaceBetwenCells);
        
      }

    }
  }
}

/**
 * La funcion paint_new_state pinta sobre un objeto canvas, usando una matrix para posicionarse, un estado conformado por:
 * la posicon del agente, y las posiciones de las cajas.
 * @param {html} canvas 
 * @param {Array} matrix 
 * @param {dict} state 
 */
export function paint_new_state(canvas, matrix, state) {
  var pos_boxes = state[0];
  var pos_agent = state[1];
  var numberOfCells = Math.max(matrix[0].length, matrix.length);
  var canvasContext = canvas.getContext("2d");
  var canvasWidth = canvas.width;
  var peaceBetwenCells = canvasWidth / numberOfCells;

  //paint boxes
  for (var i = 0; i < pos_boxes.length; i++) {
    canvasContext.fillStyle = "rgba(0, 250, 250)";
    canvasContext.fillRect(
      pos_boxes[i][1] * peaceBetwenCells,
      pos_boxes[i][0] * peaceBetwenCells,
      peaceBetwenCells,
      peaceBetwenCells
    );
  }

  //paint agent
  canvasContext.fillStyle = "rgba(255, 0, 0)";
  canvasContext.fillRect(
    pos_agent[1] * peaceBetwenCells,
    pos_agent[0] * peaceBetwenCells,
    peaceBetwenCells,
    peaceBetwenCells
  );
}