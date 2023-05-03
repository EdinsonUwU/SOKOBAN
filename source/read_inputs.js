/**
 * La funcion create_matrix lee lo que el usuario ha pegado/escrito en el text area. Y lo guarda en un
 * array de array
 * @returns array
 */
export function create_matrix() {
  var matriz_leida = [];
  var rows = read_user_input();

  if (rows === "") {
    return [];
  }
  var length_of_matrix = 0
  var length_of_input = rows.length
  while (length_of_matrix < length_of_input) {
    if (rows[length_of_matrix].split("").includes('W') ||
      rows[length_of_matrix].split("").includes('0') ||
      rows[length_of_matrix].split("").includes('X')) {
      matriz_leida.push(rows[length_of_matrix].split(""))
    }
    length_of_matrix++
  }
  return matriz_leida;
}

/**
 * La funcion read_pos_agent lee la posicion del agente que el usuario pego/escribio en el text area y lo
 * guarda/retorna un array con esas coordenadas
 * @returns array
 */
export function read_pos_agent() {
  var rows = read_user_input()

  if (rows === "") {
    return [];
  }

  var length_of_matrix = 0
  var length_of_input = rows.length
  while (length_of_matrix < length_of_input) {
    if (rows[length_of_matrix].split("").includes('W') ||
      rows[length_of_matrix].split("").includes('0') ||
      rows[length_of_matrix].split("").includes('X')) {
      length_of_matrix++
    } else {
      break
    }

  }

  var agent_cords = rows[length_of_matrix].split(',')
  return [parseInt(agent_cords[0]), parseInt(agent_cords[1])]
}

/**
 * La funcion read_pos_boxes lee la posicion de las cajas que el usuairo pego/escribio en el text area y
 * lo guarda/retorna en un array de arrays con las posiciones/coordenadas de cada una de las cajas
 * @returns array
 */
export function read_pos_boxes() {
  var rows = read_user_input()

  if (rows === "") {
    return [];
  }

  var length_of_matrix = 0
  var length_of_input = rows.length
  while (length_of_matrix < length_of_input) {
    if (rows[length_of_matrix].split("").includes('W') ||
      rows[length_of_matrix].split("").includes('0') ||
      rows[length_of_matrix].split("").includes('X')) {
      length_of_matrix++
    } else {
      break
    }

  }

  var pos_boxes = []

  for (let i = length_of_matrix + 1; i < rows.length; i++) {
    if (rows[i] === '') {
      break
    }
    var boxes_cords = rows[i].split(',')
    pos_boxes.push([parseInt(boxes_cords[0]), parseInt(boxes_cords[1])])
  }

  return pos_boxes
}

/**
 * La funcion read_user_input retorna un array de longitud igual a la cantidad de lineas de lo que el usuario 
 * escribio en el text area. Cada poiscion del array, es una linea de texto, que contiene lo que el usuario
 * escribio en esa linea.
 * @returns array
 */
function read_user_input() {
  var textarea = document.getElementById("textarea");
  var textarea_value = textarea.value;
  var rows = textarea_value.split(/\r?\n|\r|\n/g);

  return rows;
}



