export function apply_opperators(matrix,state){
    var numberOfCells = matrix.length
    var agentX = state[1][0]
    var agentY = state[1][1]

    //en vez de sensors en possible movements, debe de ir los estados nuevos, con la pos_agente y pos box


    //state[0] es un array con las coordenadas en [x,y] de las cajas, ej: [[x1,y1],[x2,y2]]
    //state[1] es un array con la pos del agente, ej: [agX,agY]
    //state es ej: [[[x1,y1],[x2,y2]], [agX,agY]]
    var POSSIBLE_MOVEMENTS = new Array(4);
    if (agentX > 0) {//LEFT_SENSOR
        if (matrix[agentX - 1][agentY] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentX - 1, agentY]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0] - 1, state[1][1]]]);
        }
        if (agentX > 1) {
            if (matrix[agentX - 2][agentY] != 'W' && //la caja puede ser desplazada
                matrix[agentX - 1][agentY] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentX - 2, agentY])) && //no hay una caja en matrix[agentX - 2][agentY]
                JSON.stringify(state[0]).includes(JSON.stringify([agentX - 1, agentY]))) { //hay una caja en matrix[agentX - 1][agentY]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentX - 1, agentY])) {
                        new_boxes_array.append([state[0][i][0] - 2, state[0][i][1]])
                    } else {
                        new_boxes_array.append(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0] - 1, state[1][1]]]);
            }
        }
    }


    if (agentY > 0) {//UP_SENSOR
        if (matrix[agentX][agentY - 1] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentX, agentY - 1]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0], state[1][1] - 1]]);
        }
        if (agentY > 1) {
            if (matrix[agentX][agentY - 2] != 'W' && //la caja puede ser desplazada
                matrix[agentX][agentY - 1] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentX, agentY - 2])) && //no hay una caja en matrix[agentX][agentY - 2]
                JSON.stringify(state[0]).includes(JSON.stringify([agentX, agentY - 1]))) { //hay una caja en matrix[agentX][agentY-1]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentX, agentY - 1])) {
                        new_boxes_array.append([state[0][i][0], state[0][i][1] - 2])
                    } else {
                        new_boxes_array.append(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0], state[1][1] - 1]]);
            }
        }
    }
    if (agentX + 1 < numberOfCells) {//RIGHT_SENSOR
        if (matrix[agentX + 1][agentY] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentX + 1, agentY]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0] + 1, state[1][1]]]);
        }
        if (agentX + 2 < numberOfCells) {
            if (matrix[agentX + 2][agentY] != 'W' && //la caja puede ser desplazada
                matrix[agentX + 1][agentY] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentX + 2, agentY])) && //no hay una caja en matrix[agentX][agentY - 2]
                JSON.stringify(state[0]).includes(JSON.stringify([agentX + 1, agentY]))) { //hay una caja en matrix[agentX][agentY-1]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentX + 1, agentY])) {
                        new_boxes_array.append([state[0][i][0] + 2, state[0][i][1]])
                    } else {
                        new_boxes_array.append(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0] + 1, state[1][1]]]);
            }
        }
    }
    if (agentY + 1 < numberOfCells) {//DOWN_SENSOR
        if (matrix[agentX][agentY+1] != 'W' &&
            !JSON.stringify(state[0]).includes(JSON.stringify([agentX, agentY+1]))) {
            POSSIBLE_MOVEMENTS.push([JSON.parse(JSON.stringify(state[0])),
            [state[1][0], state[1][1]+1]]);
        }
        if (agentY + 2 < numberOfCells) {
            if (matrix[agentX][agentY+2] != 'W' && //la caja puede ser desplazada
                matrix[agentX][agentY+1] != 'W' && //puede haber una caja en la siguiente celda
                !JSON.stringify(state[0]).includes(JSON.stringify([agentX, agentY+2])) && //no hay una caja en matrix[agentX][agentY - 2]
                JSON.stringify(state[0]).includes(JSON.stringify([agentX, agentY+1]))) { //hay una caja en matrix[agentX][agentY-1]

                var new_boxes_array = []

                for (let i = 0; i < state[0].length; i++) {
                    if (JSON.stringify(state[0][i]) === JSON.stringify([agentX, agentY+1])) {
                        new_boxes_array.append([state[0][i][0], state[0][i][1]+2])
                    } else {
                        new_boxes_array.append(JSON.parse(JSON.stringify(state[0][i])))
                    }
                }

                POSSIBLE_MOVEMENTS.push([new_boxes_array,
                    [state[1][0], state[1][1]+1]]);
            }
        }
    }
    return POSSIBLE_MOVEMENTS
}