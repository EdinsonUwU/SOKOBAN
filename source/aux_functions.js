export function apply_opperators(matrix, state) {
    var numberOfCells = matrix.length
    var agentRow = state[1][0]
    var agentColumn = state[1][1]
    
    //en vez de sensors en possible movements, debe de ir los estados nuevos, con la pos_agente y pos box


    //state[0] es un array con las coordenadas en [y,x] de las cajas, ej: [[y1,x1],[y2,x2]]
    //state[1] es un array con la pos del agente, ej: [agY,agX]
    //state es ej: [[[y1,x1],[y2,x2]], [agY,agX]]
    var POSSIBLE_MOVEMENTS = new Array(0);

    if (agentColumn + 1 < numberOfCells) {//RIGHT_SENSOR
        if (matrix[agentRow][agentColumn + 1] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentRow,agentColumn + 1]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0], state[1][1]+1]]);
        }
        if (agentColumn + 2 < numberOfCells) {
            if (matrix[agentRow][agentColumn + 2] != 'W' && //la caja puede ser desplazada
                matrix[agentRow][agentColumn + 1] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentRow,agentColumn + 2])) && //no hay una caja en matrix[agentColumn][agentRow - 2]
                JSON.stringify(state[0]).includes(JSON.stringify([agentRow,agentColumn + 1]))) { //hay una caja en matrix[agentColumn][agentRow-1]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentRow,agentColumn + 1])) {
                        new_boxes_array.push([state[0][i][0], state[0][i][1]+1])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0], state[1][1]+1]]);
            }
        }
    }


    if (agentColumn > 0) {//LEFT_SENSOR
        if (matrix[agentRow][agentColumn - 1] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentRow,agentColumn - 1]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0],state[1][1] - 1]]);
        }
        if (agentColumn > 1) {
            if (matrix[agentRow][agentColumn - 2] != 'W' && //la caja puede ser desplazada
                matrix[agentRow][agentColumn - 1] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentRow,agentColumn - 2])) && //no hay una caja en matrix[agentColumn - 2][agentRow]
                JSON.stringify(state[0]).includes(JSON.stringify([agentRow,agentColumn - 1]))) { //hay una caja en matrix[agentColumn - 1][agentRow]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentRow,agentColumn - 1])) {
                        new_boxes_array.push([state[0][i][0],state[0][i][1]-1])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0],state[1][1]-1]]);
            }
        }
    }


    if (agentRow + 1 < numberOfCells) {//DOWN_SENSOR
        if (matrix[agentRow + 1][agentColumn] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentRow + 1,agentColumn]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0]+1, state[1][1]]]);
        }
        if (agentRow + 2 < numberOfCells) {
            if (matrix[agentRow + 2][agentColumn] != 'W' && //la caja puede ser desplazada
                matrix[agentRow + 1][agentColumn] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentRow + 2,agentColumn])) && //no hay una caja en matrix[agentColumn][agentRow - 2]
                JSON.stringify(state[0]).includes(JSON.stringify([agentRow + 1,agentColumn]))) { //hay una caja en matrix[agentColumn][agentRow-1]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentRow + 1,agentColumn])) {
                        new_boxes_array.push([state[0][i][0]+1, state[0][i][1]])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0]+1, state[1][1]]]);
            }
        }
    }


    if (agentRow > 0) {//UP_SENSOR
        if (matrix[agentRow - 1][agentColumn] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentRow - 1,agentColumn]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0] - 1,state[1][1]]]);
        }
        if (agentRow > 1) {
            if (matrix[agentRow - 2][agentColumn] != 'W' && //la caja puede ser desplazada
                matrix[agentRow - 1][agentColumn] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentRow - 2,agentColumn])) && //no hay una caja en matrix[agentColumn][agentRow - 2]
                JSON.stringify(state[0]).includes(JSON.stringify([agentRow - 1,agentColumn]))) { //hay una caja en matrix[agentColumn][agentRow-1]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentRow - 1,agentColumn])) {
                        new_boxes_array.push([state[0][i][0]-1, state[0][i][1]])
                    } else {
                        new_boxes_array.push(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0]-1, state[1][1]]]);
            }
        }
    }

    return POSSIBLE_MOVEMENTS
}