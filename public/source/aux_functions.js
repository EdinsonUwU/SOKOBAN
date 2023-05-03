/**
 * La funcion apply_opperators, toma una matriz para conocer la posicion de las paredes y los nodos meta.
 * y toma como segundo parametro, movement, que es un diccionario, con keys operator y state.
 * Apartir de las propiedades del state, la funcion extrae: la posicion del agente, y la posicion de las cajas.
 * Con esas posiciones, mira los nodos vecinos que son posibles a partir de la matriz.
 * Cada operador, UP, DOWN, LEFT, RIGHT, puede llevar a mover el agente una posicion y mantener la posicion
 * de las cajas, o puede llevar a mover el agente una posicion y mover la posicion de una de las cajas.
 * @param {Array} matrix 
 * @param {Dict} movement 
 * @returns array
 */
export function apply_opperators(matrix, movement) {
    var numberOfCells = matrix.length
    var agentRow = movement.state.agent_position.row
    var agentColumn = movement.state.agent_position.column
    var boxes = movement.state.boxes_position

    //boxes es un array con las coordenadas en [y,x] de las cajas, ej: [[y1,x1],[y2,x2]]
    //state es ej: [[[y1,x1],[y2,x2]], [agY,agX]]
    var POSSIBLE_MOVEMENTS_v2 = new Set()

    if (agentColumn + 1 < numberOfCells) {//RIGHT_SENSOR
        if (matrix[agentRow][agentColumn + 1] != 'W' &&
            !JSON.stringify(boxes).includes(JSON.stringify([agentRow, agentColumn + 1]))) {

            POSSIBLE_MOVEMENTS_v2.add({
                operator: "RIGHT",
                state: {
                    boxes_position: JSON.parse(JSON.stringify(boxes)),
                    agent_position: {
                        row: agentRow,
                        column: agentColumn + 1
                    }
                }
            })

        }
        if (agentColumn + 2 < numberOfCells) {
            if (matrix[agentRow][agentColumn + 2] != 'W' && //la caja puede ser desplazada
                matrix[agentRow][agentColumn + 1] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(boxes).includes(JSON.stringify([agentRow, agentColumn + 2])) && //no hay una caja en matrix[agentColumn][agentRow - 2]
                JSON.stringify(boxes).includes(JSON.stringify([agentRow, agentColumn + 1]))) { //hay una caja en matrix[agentColumn][agentRow-1]

                var new_boxes_array = []

                for (let i = 0; i < boxes.length; i++) {//revisar posicion de  las cajas/actualizarlas
                    if (JSON.stringify(boxes[i]) === JSON.stringify([agentRow, agentColumn + 1])) {
                        new_boxes_array.push([boxes[i][0], boxes[i][1] + 1])// ya encontro la caja a mover
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(boxes[i])))// no era la caja a mover
                    }
                }

                POSSIBLE_MOVEMENTS_v2.add({
                    operator: "RIGHT",
                    state: {
                        boxes_position: new_boxes_array,
                        agent_position: {
                            row: agentRow,
                            column: agentColumn + 1
                        }
                    }
                })
            }
        }
    }


    if (agentColumn > 0) {//LEFT_SENSOR
        if (matrix[agentRow][agentColumn - 1] != 'W' &&
            !JSON.stringify(boxes).includes(JSON.stringify([agentRow, agentColumn - 1]))) {

            POSSIBLE_MOVEMENTS_v2.add({
                operator: "LEFT",
                state: {
                    boxes_position: JSON.parse(JSON.stringify(boxes)),
                    agent_position: {
                        row: agentRow,
                        column: agentColumn -1
                    }
                }
            })
        }
        if (agentColumn > 1) {
            if (matrix[agentRow][agentColumn - 2] != 'W' && //la caja puede ser desplazada
                matrix[agentRow][agentColumn - 1] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(boxes).includes(JSON.stringify([agentRow, agentColumn - 2])) && //no hay una caja en matrix[agentColumn - 2][agentRow]
                JSON.stringify(boxes).includes(JSON.stringify([agentRow, agentColumn - 1]))) { //hay una caja en matrix[agentColumn - 1][agentRow]

                var new_boxes_array = []

                for (let i = 0; i < boxes.length; i++) {//revisar posicion de  las cajas/actualizarlas
                    if (JSON.stringify(boxes[i]) === JSON.stringify([agentRow, agentColumn - 1])) {
                        new_boxes_array.push([boxes[i][0], boxes[i][1] - 1])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(boxes[i])))
                    }
                }

                POSSIBLE_MOVEMENTS_v2.add({
                    operator: "LEFT",
                    state: {
                        boxes_position: new_boxes_array,
                        agent_position: {
                            row: agentRow,
                            column: agentColumn - 1
                        } 
                    }
                })
            }
        }
    }


    if (agentRow + 1 < numberOfCells) {//DOWN_SENSOR
        if (matrix[agentRow + 1][agentColumn] != 'W' &&
            !JSON.stringify(boxes).includes(JSON.stringify([agentRow + 1, agentColumn]))) {

            POSSIBLE_MOVEMENTS_v2.add({
                operator: "DOWN",
                state: {
                    boxes_position: JSON.parse(JSON.stringify(boxes)),
                    agent_position: {
                        row: agentRow + 1,
                        column: agentColumn
                    }
                }
            })

        }
        if (agentRow + 2 < numberOfCells) {
            if (matrix[agentRow + 2][agentColumn] != 'W' && //la caja puede ser desplazada
                matrix[agentRow + 1][agentColumn] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(boxes).includes(JSON.stringify([agentRow + 2, agentColumn])) && //no hay una caja en matrix[agentColumn][agentRow - 2]
                JSON.stringify(boxes).includes(JSON.stringify([agentRow + 1, agentColumn]))) { //hay una caja en matrix[agentColumn][agentRow-1]

                var new_boxes_array = []

                for (let i = 0; i < boxes.length; i++) {//revisar posicion de  las cajas/actualizarlas
                    if (JSON.stringify(boxes[i]) === JSON.stringify([agentRow + 1, agentColumn])) {
                        new_boxes_array.push([boxes[i][0] + 1, boxes[i][1]])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(boxes[i])))
                    }
                }

                POSSIBLE_MOVEMENTS_v2.add({
                    operator: "DOWN",
                    state: {
                        boxes_position: new_boxes_array,
                        agent_position: {
                            row: agentRow + 1, 
                            column: agentColumn
                        } 
                    }
                })
            }
        }
    }


    if (agentRow > 0) {//UP_SENSOR
        if (matrix[agentRow - 1][agentColumn] != 'W' &&
            !JSON.stringify(boxes).includes(JSON.stringify([agentRow - 1, agentColumn]))) {

            POSSIBLE_MOVEMENTS_v2.add({
                operator: "UP",
                state: {
                    boxes_position: JSON.parse(JSON.stringify(boxes)),
                    agent_position: {
                        row: agentRow - 1,
                        column:  agentColumn
                    }
                }
            })
        }
        if (agentRow > 1) {
            if (matrix[agentRow - 2][agentColumn] != 'W' && //la caja puede ser desplazada
                matrix[agentRow - 1][agentColumn] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(boxes).includes(JSON.stringify([agentRow - 2, agentColumn])) && //no hay una caja en matrix[agentColumn][agentRow - 2]
                JSON.stringify(boxes).includes(JSON.stringify([agentRow - 1, agentColumn]))) { //hay una caja en matrix[agentColumn][agentRow-1]

                var new_boxes_array = []

                for (let i = 0; i < boxes.length; i++) {//revisar posicion de  las cajas/actualizarlas
                    if (JSON.stringify(boxes[i]) === JSON.stringify([agentRow - 1, agentColumn])) {
                        new_boxes_array.push([boxes[i][0] - 1, boxes[i][1]])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(boxes[i])))
                    }
                }

                POSSIBLE_MOVEMENTS_v2.add({
                    operator: "UP",
                    state:{
                        boxes_position: new_boxes_array,
                        agent_position: {
                            row: agentRow - 1,
                            column: agentColumn
                        }
                    }
                })
            }
        }
    }

    return POSSIBLE_MOVEMENTS_v2
}

/**
 * La funcion check_end, que toma una matriz, y las posiciones del las cajas y el agente en un array,
 * revisa si las posiciones de las cajas son iguales a las posiciones metas escritas en la matriz
 * @param {Array} matrix 
 * @param {Array} boxes_and_agent 
 * @returns 
 */
export function check_end(matrix, boxes_and_agent) {
    const pos_of_all_boxes = boxes_and_agent.state.boxes_position
    const number_of_boxes = pos_of_all_boxes.length
    var number_of_boxes_in_slots = 0;

    for (let i = 0; i < number_of_boxes; i++) {
        const box_row = pos_of_all_boxes[i][0]
        const box_column = pos_of_all_boxes[i][1]

        if (matrix[box_row][box_column] == 'X') {
            number_of_boxes_in_slots += 1
        }
    }

    if (number_of_boxes == number_of_boxes_in_slots) {
        return true
    }

    return false
}

/**
 * La funcion box_in_corner, toma una matriz, y un array con las posiciones de las cajas y el agente.
 * Revisa si cada caja tiene arriba e izquierda, o arriba o derecha, o abajo y derecha, o abajo e izquierda
 * cajas, que impidan moverse. Esta funcion se usa para saber si vale la pena seguir procesando los hijos
 * de un nodo, en este caso, un nodo resumido en las posiciones de las cajas y el agente.
 * @param {Array} matrix 
 * @param {Array} boxes_and_agent 
 * @returns Boolean
 */
export function box_in_corner(matrix, boxes_and_agent) {
    const pos_of_all_boxes = boxes_and_agent.state.boxes_position
    const number_of_boxes = pos_of_all_boxes.length
    var box_row;
    var box_column;

    for (let i = 0; i < number_of_boxes; i++) {
        box_row = pos_of_all_boxes[i][0]
        box_column = pos_of_all_boxes[i][1]
        var wall_at_right = false
        var wall_at_left = false
        var wall_at_up = false
        var wall_at_down = false
        //
        if (box_column > 0) {
            if ((matrix[box_row][box_column - 1] == 'W')) {
                wall_at_left = true
            }
        }
        if (box_column + 1 < matrix[0].length) {
            if ((matrix[box_row][box_column + 1] == 'W')) {
                wall_at_right = true
            }
        }
        if (box_row > 0) {
            if ((matrix[box_row - 1][box_column] == 'W')) {
                wall_at_up = true
            }
        }
        if (box_row + 1 < matrix.length) {
            if ((matrix[box_row + 1][box_column] == 'W')) {
                wall_at_down = true
            }
        }

        if ((wall_at_up && wall_at_left) || (wall_at_up && wall_at_right)) {
            if (matrix[box_row][box_column] != 'X') {
                return true
            }
        }

        if ((wall_at_down && wall_at_left) || (wall_at_down && wall_at_right)) {
            if (matrix[box_row][box_column] != 'X') {
                return true
            }
        }
    }

    return false
}