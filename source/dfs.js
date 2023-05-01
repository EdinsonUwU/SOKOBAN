import { apply_opperators } from "/source/aux_functions.js";
import { repaint_matrix, repaint_the_map, paint_new_state } from "/source/paint_world.js";

const order_of_adding_childs_states = ['UP', 'DOWN', 'LEFT', 'RIGHT']

export async function dfs(canvas, matrix, initial_state) {

    var stack = [{ node: initial_state, path: [] }]
    const visited = new Set()

    while (stack.length > 0) {
        const { node, path } = stack.pop()

        if (!visited.has(JSON.stringify(node))) {
            visited.add(JSON.stringify(node))

            console.log("\n\n")
            console.log("Set of visited nodes: ", visited)

            repaint_the_map(canvas, matrix.length);// llamar esta funcion desde el dfs
            repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
            paint_new_state(canvas, matrix, [node.state.boxes_position, [node.state.agent_position.row, node.state.agent_position.column]]);

            //Sleep for 3 seconds
            await new Promise((r) => setTimeout(r, 0));

            if (check_end(matrix, node)) {
                console.log("Path found: ", ...path, " ending on node: ", node)
                //crear funcion que imprime el camino en path
                var dfs_output_html = document.getElementById('dfs-output')
                dfs_output_html.value = path.join('')
                return [node, ...path]
            }

            if (box_in_corner(matrix, node)) {
                continue;
            }

            const neighbors = apply_opperators(matrix, node)
            console.log("negihbors of node : ", node, " are ", neighbors)
            for (let i of neighbors.keys()) {
                //crear una funcion push_orderly, y que meta en path la primera letra de la operacion
                //stack.push({ node: i, path: [...path, node] })
                push_orderly(stack,i,path)
            }
        }
    }
    return null;
}

function check_end(matrix, boxes_and_agent) {
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

function box_in_corner(matrix, boxes_and_agent) {
    const pos_of_all_boxes = boxes_and_agent.state.boxes_position
    const number_of_boxes = pos_of_all_boxes.length
    var box_row;
    var box_column;

    for (let i = 0; i < number_of_boxes; i++) {
        box_row = pos_of_all_boxes[i][0]
        box_column = pos_of_all_boxes[i][1]
        console.log([box_row, box_column])
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

function push_orderly(stack, node, path) {
    
    if (node.operator == 'RIGHT') {
        stack.push({
            node: node,
            path: [...path, 'R']
        })
    }

    if (node.operator == 'LEFT') {
        stack.push({
            node: node,
            path: [...path, 'L']
        })
    }

    if (node.operator == 'DOWN') {
        stack.push({
            node: node,
            path: [...path, 'D']
        })
    }

    if (node.operator == 'UP') {
        stack.push({
            node: node,
            path: [...path, 'U']
        })
    }
    return stack
}