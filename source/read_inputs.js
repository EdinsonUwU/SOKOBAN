
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
  console.log(matriz_leida)
  return matriz_leida;
}

export function read_pos_agent() {
  var matriz_leida = [];
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

export function read_pos_boxes() {
  var matriz_leida = [];
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

function read_user_input() {
  var textarea = document.getElementById("textarea");
  var textarea_value = textarea.value;
  var rows = textarea_value.split(/\r?\n|\r|\n/g);

  return rows;
}



