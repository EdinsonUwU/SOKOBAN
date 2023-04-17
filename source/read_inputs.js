export function create_matrix(){
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



