import { apply_opperators } from "/source/aux_functions.js";
import { repaint_matrix, repaint_the_map, paint_new_state } from "/source/paint_world.js";
export async function dfs(canvas, matrix, state) {
    //console.log(apply_opperators(matrix,state))
    //var new_states = apply_opperators(matrix,state)//esto va al allar los nodos hijo

    var stack = [{ node: state, path: [] }]
    const visited = new Set()
    console.log("aa")

    while (stack.length > 0) {
        const { node, path } = stack.pop()
        if (check_end()) {
            return [node, ...path]
        }
        if (!visited.has(JSON.stringify(node))) {
            visited.add(JSON.stringify(node))
            console.log(visited)
            repaint_the_map(canvas, matrix.length);// llamar esta funcion desde el dfs
            repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
            paint_new_state(canvas, matrix, node);
            //Sleep for 3 seconds
            await new Promise((r) => setTimeout(r, 1000));

            const neighbors = apply_opperators(matrix, node)
            console.log(neighbors)
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
    return false
}