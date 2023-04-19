export function create_matrix() {
  var matriz_leida = [];
  function read_matrix() {
    var textarea = document.getElementById("textarea");
    var textarea_value = textarea.value;
    var rows = textarea_value.split(/\r?\n|\r|\n/g);

    return rows;
  }

  var rows = read_matrix();

  if (rows === "") {
    return [];
  }

  for (var i = 0; i < rows[0].length; i++) {
    var columns = rows[i].split("");
    matriz_leida.push(columns);
  }

  return matriz_leida;
}

export function read_pos_agent(){
    var textarea = document.getElementById("textarea");
    var textarea_value = textarea.value;
    var rows = textarea_value.split(/\r?\n|\r|\n/g);

    if (rows === "") {
        return [];
    }
    var array_of_strings = rows[rows[0].length].split(',')
    return [parseInt(array_of_strings[0]),parseInt(array_of_strings[1])]
}

export function read_pos_boxes(){
    var textarea = document.getElementById("textarea");
    var textarea_value = textarea.value;
    var rows = textarea_value.split(/\r?\n|\r|\n/g);

    if (rows === "") {
        return [];
    }

    var pos_boxes = []

    for (let i = rows[0].length+1; i < rows.length;i++){
        if (rows[i] === ''){
            break
        }
        var array_of_strings = rows[i].split(',')
        pos_boxes.push([parseInt(array_of_strings[0]),parseInt(array_of_strings[1])])
    }

    return pos_boxes
}





