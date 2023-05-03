import { apply_opperators, check_end, box_in_corner } from "/source/aux_functions.js";
import { repaint_matrix, paint_new_state } from "/source/paint_world.js";

/**
 * La funcion dfsi, usa el algoritmo deep first search iterative para dar solucion a un estado de el juego de sokoban.
 * Primero mira si el nodo initial_state es meta, si no lo es, explora sus vecinos.
 * Para implementar este algoritmo se usa una stack/pila.
 * Los vecinos son añadidos en la pila en el orden: right, left, down, up.
 * Para asi primero checkear si el nodo despues del operador up es meta, y si no lo es explora sus vecinos...
 * Hasta cuando se llega a una determinada profundidad (10), el algoritmo es practicamente dfs, pero, cuando todos los nodos
 * ya son de una determindad profundidad +  1, se sigue con cada nodo de esa profundiad, hasta que todos los nodos de esa
 * profundidad son explorados y verificados, y asi sucesivamente hasta encontrar una solucion.
 * @param {canvas} canvas 
 * @param {Array} matrix 
 * @param {dict} initial_state 
 * @returns string
 */
export async function dfsi(canvas, matrix, initial_state) {

    var stack = [{ node: initial_state, path: [], depth: 0 }]
    var new_stack = []
    var maximum_depth = 10
    const visited = new Set()

    while (true) {
        while (stack.length > 0) {
            const { node, path, depth } = stack.pop()

            if (!visited.has(JSON.stringify(node))) {
                visited.add(JSON.stringify(node))

                console.log("\n\n")
                console.log("Set of visited nodes: ", visited)

                repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
                paint_new_state(canvas, matrix, [node.state.boxes_position, [node.state.agent_position.row, node.state.agent_position.column]]);

                //Sleep for 3 seconds
                await new Promise((r) => setTimeout(r, 0));

                if (check_end(matrix, node)) {
                    console.log("Path found: ", ...path, " ending on node: ", node)
                    //crear funcion que imprime el camino en path
                    var dfsi_output_html = document.getElementById('dfsi-output')
                    dfsi_output_html.value = path.join('')
                    return path.join('')
                }

                if (box_in_corner(matrix, node)) {
                    continue;
                }

                const neighbors = apply_opperators(matrix, node)
                console.log("negihbors of node : ", node, " are ", neighbors)

                console.log("stack: ", stack)
                //crear una funcion push_orderly, y que meta en path la primera letra de la operacion
                if (depth == maximum_depth)
                    push_orderly(new_stack, neighbors, path, depth)
                else
                    push_orderly(stack, neighbors, path, depth)
            }
        }
        maximum_depth++
        stack = [...new_stack].reverse()
        new_stack = []
    }
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
function push_orderly(stack, neighbors, path, depth) {

    for (let node of neighbors) {
        if (node.operator == 'RIGHT') {
            stack.push({
                node: node,
                path: [...path, 'R'],
                depth: depth + 1
            })
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'LEFT') {
            stack.push({
                node: node,
                path: [...path, 'L'],
                depth: depth + 1
            })
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'DOWN') {
            stack.push({
                node: node,
                path: [...path, 'D'],
                depth: depth + 1
            })
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'UP') {
            stack.push({
                node: node,
                path: [...path, 'U'],
                depth: depth + 1
            })
        }
    }

    return stack
}