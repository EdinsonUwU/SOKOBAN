import { apply_opperators, check_end, box_in_corner } from "/source/aux_functions.js";
import { repaint_matrix, repaint_the_map, paint_new_state } from "/source/paint_world.js";

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

                repaint_the_map(canvas, matrix.length);// llamar esta funcion desde el dfs
                repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
                paint_new_state(canvas, matrix, [node.state.boxes_position, [node.state.agent_position.row, node.state.agent_position.column]]);

                //Sleep for 3 seconds
                await new Promise((r) => setTimeout(r, 0));

                if (check_end(matrix, node)) {
                    console.log("Path found: ", ...path, " ending on node: ", node)
                    //crear funcion que imprime el camino en path
                    var dfsi_output_html = document.getElementById('dfsi-output')
                    dfsi_output_html.value = path.join('')
                    return [node, ...path]
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