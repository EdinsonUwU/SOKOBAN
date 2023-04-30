import { apply_opperators } from "/source/aux_functions.js";
import { repaint_matrix, repaint_the_map, paint_new_state } from "/source/paint_world.js";
export async function dfs(canvas, matrix, state) {
    //console.log(apply_opperators(matrix,state))
    //var new_states = apply_opperators(matrix,state)//esto va al allar los nodos hijo

    var stack = [{ node: state, path: [] }]
    const visited = new Set()

    while (stack.length > 0) {
        const { node, path } = stack.pop()

        if (!visited.has(JSON.stringify(node))) {
            visited.add(JSON.stringify(node))

            console.log("\n\n")
            console.log("Set of visited nodes: ", visited)
            repaint_the_map(canvas, matrix.length);// llamar esta funcion desde el dfs
            repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
            paint_new_state(canvas, matrix, node);

            if (check_end(matrix,node)) {
                console.log("Path found: ", ...path, " ending on node: ", node)
                return [node, ...path]
            }

            if (box_in_corner(matrix,node)){
                continue;
            }

            //Sleep for 3 seconds
            await new Promise((r) => setTimeout(r, 250));

            const neighbors = apply_opperators(matrix, node)
            console.log("negihbors of node : ", node, " are ", neighbors)
            for (let i = 0; i < neighbors.length; i++) {
                stack.push({ node: neighbors[i], path: [...path, node] })
            }
        }
    }

    //Sleep for 3 seconds
    //await new Promise((r) => setTimeout(r, 1000));
    //console.log("a")
    //dfs(canvas, matrix, state)
    return null;
}

export async function dfs_fast(canvas, matrix, state) {
    //console.log(apply_opperators(matrix,state))
    //var new_states = apply_opperators(matrix,state)//esto va al allar los nodos hijo

    var stack = [{ node: state, path: [] }]
    const visited = new Set()

    while (stack.length > 0) {
        const { node, path } = stack.pop()

        if (!visited.has(JSON.stringify(node))) {
            visited.add(JSON.stringify(node))

            if (check_end(matrix,node)) {
                console.log("Path found: ", ...path, " ending on node: ", node)
                return [node, ...path]
            }

            if (box_in_corner(matrix,node)){
                continue;
            }

            const neighbors = apply_opperators(matrix, node)
            for (let i = 0; i < neighbors.length; i++) {
                stack.push({ node: neighbors[i], path: [...path, node] })
            }
        }
    }

    //Sleep for 3 seconds
    //await new Promise((r) => setTimeout(r, 1000));
    //console.log("a")
    //dfs(canvas, matrix, state)
    return null;
}

function check_end(matrix, state) {
    const numberOfCells = matrix.length
    const pos_of_all_boxes = state[0]
    const number_of_boxes = pos_of_all_boxes.length
    var number_of_boxes_in_slots = 0;
    
    for (let i = 0; i < pos_of_all_boxes.length; i++){
        const box_column = pos_of_all_boxes[i][1]
        const box_row = pos_of_all_boxes[i][0]

        if(matrix[box_row][box_column] == 'X'){
            number_of_boxes_in_slots += 1
        }
    }
    
    if(number_of_boxes == number_of_boxes_in_slots){
        return true
    }

    return false
}

function box_in_corner(matrix,state){
    return false;
}