import { apply_opperators, check_end, box_in_corner } from "/source/aux_functions.js";
import { repaint_matrix, paint_new_state } from "/source/paint_world.js";

/**
 * la Funcion dfs, primero mira si el nodo initial_state es meta, si no lo es, explora sus vecinos.
 * Para implementar este algoritmo se usa una stack/pila.
 * Los vecinos son añadidos en la pila en el orden: right, left, down, up.
 * Para asi primero checkear si el nodo despues del operador up es meta, y si no lo es explora sus vecinos...
 * @param {html} canvas 
 * @param {Array} matrix 
 * @param {dict} initial_state 
 * @returns string
 */
export async function dfs(canvas, matrix, initial_state) {

    var stack = [{ node: initial_state, path: [] }]
    const visited = new Set()

    while (stack.length > 0) {
        const { node, path } = stack.pop()

        if (!visited.has(JSON.stringify(node))) {
            visited.add(JSON.stringify(node))

            console.log("\n\n")
            console.log("Set of visited nodes: ", visited)

            repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
            paint_new_state(canvas, matrix, [node.state.boxes_position, [node.state.agent_position.row, node.state.agent_position.column]]);

            //Sleep for 3 seconds
            await new Promise((r) => setTimeout(r, 25));

            if (check_end(matrix, node)) {

                console.log("Path found: ", ...path, " ending on node: ", node)

                var dfs_output_html = document.getElementById('dfs-output')
                dfs_output_html.value = path.join('')
                return path.join('')
            }

            if (box_in_corner(matrix, node)) {
                continue;
            }

            const neighbors = apply_opperators(matrix, node)
            console.log("negihbors of node : ", node, " are ", neighbors)

            push_orderly(stack, neighbors, path)
        }
    }
    return null;
}

/**
 * La funcion push_orderly, mete al stack, los vecinos/neighbors.
 * La primera letra del operador, es añadida al final del string path,
 * que contiene el camino que se uso para llegar a ese nodo.
 * Debido a que en la pila, el ultimo en la pila, es el primero que se procesa,
 * Se mete primero al nodo al cual se llega por medio de la operacion RIGHT, luego,LEFT,
 * DOWN, y por ultimo UP, para asi procesar el nodo despues del operador UP primero.
 * 
 * @param {Array} stack 
 * @param {Array} neighbors 
 * @param {String} path 
 */
function push_orderly(stack, neighbors, path) {

    for (let node of neighbors) {
        if (node.operator == 'RIGHT') {
            stack.push({
                node: node,
                path: [...path, 'R']
            })
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'LEFT') {
            stack.push({
                node: node,
                path: [...path, 'L']
            })
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'DOWN') {
            stack.push({
                node: node,
                path: [...path, 'D']
            })
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'UP') {
            stack.push({
                node: node,
                path: [...path, 'U']
            })
        }
    }
}