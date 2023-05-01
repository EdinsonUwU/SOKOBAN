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