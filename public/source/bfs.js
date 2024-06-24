import { apply_opperators, check_end, box_in_corner } from "/source/aux_functions.js";
import { repaint_matrix, paint_new_state } from "/source/paint_world.js";

/**
 * la Funcion bfs, primero mira si el nodo initial_state es meta, si no lo es, explora sus vecinos.
 * Para implementar este algoritmo se usa una queue/cola.
 * Los vecinos son añadidos en la pila en el orden: up, down, left, right.
 * Para asi primero checkear si el nodo despues del operador up es meta, y si no lo es explora sus vecinos...
 * Cabe destacar que en una tabla hash se guardan los nodos visitados, para no hacer calculos innecesarios
 * @param {html} canvas 
 * @param {Array} matrix 
 * @param {dict} initial_state 
 * @returns string
 */
export async function bfs(canvas, matrix, initial_state) {

    var queue = [{ node: initial_state, path: [] }]
    const visited = new Set()

    while (queue.length > 0) {
        const { node, path } = queue.shift()

        if (!visited.has(JSON.stringify(node))) {
            visited.add(JSON.stringify(node))

            console.log("\n\n")
            console.log("Set of visited nodes: ", visited)

            repaint_matrix(canvas, matrix);// llamar esta funcion desde el bfs
            paint_new_state(canvas, matrix, [node.state.boxes_position, [node.state.agent_position.row, node.state.agent_position.column]]);

            //Sleep for 3 seconds
            await new Promise((r) => setTimeout(r, 25));

            if (check_end(matrix, node)) {
                console.log("Path found: ", ...path, " ending on node: ", node)
                //crear funcion que imprime el camino en path
                var bfs_output_html = document.getElementById('bfs-output')
                bfs_output_html.value = path.join('')
                return path.join('')
            }

            if (box_in_corner(matrix, node)) {
                continue;
            }

            const neighbors = apply_opperators(matrix, node)
            console.log("negihbors of node : ", node, " are ", neighbors)


            //crear una funcion push_orderly, y que meta en path la primera letra de la operacion
            push_orderly(queue, neighbors, path)

        }
    }
    return null;
}

/**
 * La funcion push_orderly, mete al queue, los vecinos/neighbors.
 * La primera letra del operador, es añadida al final del string path,
 * que contiene el camino que se uso para llegar a ese nodo.
 * Debido a que en la cola/queue, el primero en la cola, es el primero que se procesa,
 * Se mete primero al nodo al cual se llega por medio de la operacion UP, luego, DOWN,
 * LEFT, y por ultimo RIGHT, para asi procesar el nodo despues del operador UP primero.
 * 
 * @param {Array} queue 
 * @param {Array} neighbors 
 * @param {String} path 
 */
function push_orderly(queue, neighbors, path) {
    for (let node of neighbors) {
        if (node.operator == 'UP') {
            queue.push({
                node: node,
                path: [...path, 'U']
            })
        }
    }
    for (let node of neighbors) {
        if (node.operator == 'DOWN') {
            queue.push({
                node: node,
                path: [...path, 'D']
            })
        }
    }
    for (let node of neighbors) {
        if (node.operator == 'LEFT') {
            queue.push({
                node: node,
                path: [...path, 'L']
            })
        }
    }
    for (let node of neighbors) {
        if (node.operator == 'RIGHT') {
            queue.push({
                node: node,
                path: [...path, 'R']
            })
        }
    }
    return queue
}